import { TableBulkActionsTab } from "./TableBulkActionsTab";
import { TableRelationsTab } from "./TableRelationsTab";
import { TableRowsTab } from "./TableRowsTab";
import { TabPanelEditor } from "./TabPanelEditor";
import { TableActionsTab } from "./TableActionsTab";
import { DistributionBlocksEditor } from "./DistributionBlocksEditor";
import { InfoBlocksEditor } from "./InfoBlocksEditor";
import { TableFilterInputsTab } from "./TableFilterInputsTab";
import { TableTogglesTab } from "./TableTogglesTab";
import { TableNestedRowsTab } from "./TableNestedRowsTab";
import { TableColumnsTab } from "./TableColumnsTab";
import { TableRequestTab } from "./TableRequestTab";
import { CHART_TYPES, DEFAULT_RELATION_MATRIX, CHART_SPECIFIC_OPTIONS, resizeInfoBlockItems, resizeDistributionBlockItems, createInfoBlockColorRule, EMPTY_GROUP_BY, LINK_TYPES, getDefaultActionsForSource, TableSettingsTab, TABLE_SETTINGS_TABS } from "./designerConstants";
import { cleanTableConfig, cleanFormConfig } from "./designerConfigCleaners";
import { inferPipelineOutputFields, extractPipelineParams, extractWorkflowParams, schemaFieldNames, inferWorkflowOutputFields } from "./designerSourceInference";
import { buildTableColumnsFromFields, flattenFormFields, buildDefaultFormConfig, buildFilterPanelInputsFromFields, buildDefaultCreateAction, buildDefaultBulkEditAction, buildDefaultBulkDeleteAction, hydrateSchemaEditActionFields, hydrateSchemaAddButton, buildTableColumnsFromNames } from "./designerFieldDefaults";
import VisualComponentPicker from "../../visualBuilder/VisualComponentPicker";
import { copyVisualDesign, type VisualDesignSelection } from "../../visualBuilder/componentLibrary";
import { readVisualBlock } from "../../visualBuilder/pageAdapter";
import { readStoredProject } from "../../utils/persistedContext";
import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useModalFocus } from "../../hooks/useModalFocus";
import { useTranslation } from "react-i18next";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { Input, Select, Textarea } from "../ui";
import { ComponentBlock, DistributionBlockItemConfig, DistributionBlocksConfig, FormComponentConfig, GroupBy, InfoBlockColorRule, InfoBlockItemConfig, InfoBlocksConfig, InfoBlocksSource, GeneratedRelationColumnsConfig, JsonValue, LinkType, RelationMatrixConfig, RowClassConfig, TabPanelTab, TableActionConfig, TableActionFormFieldConfig, TableColumnConfig, TableComponentConfig, TableFilterPanelInputConfig, TableToggleConfig, ToggleRequestEffect } from "../../types/page";
import { ContainerModel } from "../../utils/api/container";
import type { ComponentBlock as RuntimeComponentBlock, PageModel as RuntimePageModel, ParameterBinding as RuntimeParameterBinding } from "../../utils/api/page";
import { createRuntimeId, isSafeRuntimeName, resolveComponentStateKey, uniqueComponentStateKey, validatePageBindings, type PageBindingIssue } from "../../utils/pageBindings";
import { createDesignerTableToggle, defaultTemplateForDesignerLinkType, ensureDesignerTableBulkActions, hydrateEmptyDesignerTableColumns, hydrateDesignerTableConfigForEditing, getDesignerToggleVisibilityTargets, mergeDesignerTableColumnsFromNames, moveArrayItem, shouldHydrateEmptyDesignerTableColumns, setDesignerToggleVisibilityTargets, type DesignerVisibilityTarget } from "../../utils/pageDesignerTableConfig";
import { eligibleArrayFields, eligibleIdentityFields, cleanArrayTableSource, generateArrayTableDefaults, reconcileArrayTableDefaults } from "../../utils/pageDesignerArraySource";
import { cleanRelationMatrixConfig, isRelationMatrixConfigComplete, requiresComponentSchemaName } from "../../utils/relationMatrixConfig";
import { removeTabChild, saveSingleTabChild } from "../../utils/tabChildComponents";
import RelationMatrixFilterEditor from "./RelationMatrixRowFilterEditor";
import { CellExcelUploadModal } from "./CellExcelUploadModal";
import ComponentOutputsEditor from "./ComponentOutputsEditor";
import FormComponentEditor from "./FormComponentEditor";
import EditorSectionTabs from "./EditorSectionTabs";
import ParameterBindingsEditor from "./ParameterBindingsEditor";
import { validateSelectFilterBindings } from "../../utils/selectFilters";
import { logger } from "../../utils/logger";

export interface ComponentModalProps {
  schemas: string[];
  containerOptions: { value: string; label: string }[];
  containers: ContainerModel[];
  page: RuntimePageModel;
  currentCellId: string;
  editingComponent: ComponentBlock | null;
  fixedComponentType?: ComponentBlock["type"];
  onClose: () => void;
  onAdd: (component: ComponentBlock) => Promise<void> | void;
}

export const ComponentModal: React.FC<ComponentModalProps> = ({
  schemas,
  containerOptions,
  containers,
  page,
  currentCellId,
  editingComponent,
  fixedComponentType,
  onClose,
  onAdd,
}) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const dialogId = `${titleId}-dialog`;
  const [isSaving, setIsSaving] = useState(false);
  const savingRef = useRef(false);
  const [saveError, setSaveError] = useState("");
  const requestClose = () => { if (!savingRef.current) onClose(); };
  useModalFocus(dialogRef, true, requestClose);
  const [componentType, setComponentType] = useState<string>(
    fixedComponentType || "table",
  );
  const [visualSelection, setVisualSelection] = useState<VisualDesignSelection | null>(null);
  const [schemaName, setSchemaName] = useState<string>("");
  const [tableSourceType, setTableSourceType] = useState<
    "schema" | "pipeline" | "workflow"
  >("schema");
  const [pipelineName, setPipelineName] = useState<string>("");
  const [workflowName, setWorkflowName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tabs, setTabs] = useState<TabPanelTab[]>([]);
  const [groupBy, setGroupBy] = useState<GroupBy>(EMPTY_GROUP_BY);
  const [showTabExcelModal, setShowTabExcelModal] = useState(false);
  const [params, setParams] = useState<string>(""); // JSON string for params
  const [chartProps, setChartProps] = useState<Record<string, unknown>>({
    height: 400,
    colors: { scheme: "nivo" },
  });
  const [customChartOptions, setCustomChartOptions] = useState<string>("");
  const [paramsMap, setParamsMap] = useState<Record<string, string>>({});
  const [structuredParameters, setStructuredParameters] = useState<
    Record<string, RuntimeParameterBinding>
  >({});
  const [runtimeOutputs, setRuntimeOutputs] = useState<
    NonNullable<ComponentBlock["outputs"]>
  >([]);
  const [stateKey, setStateKey] = useState<string>("");
  const [stateKeyTouched, setStateKeyTouched] = useState(false);
  const [bindingIssues, setBindingIssues] = useState<PageBindingIssue[]>([]);
  const [showAdvancedJson, setShowAdvancedJson] = useState<boolean>(false);
  const [customParamKey, setCustomParamKey] = useState<string>("");
  const [tableEditorTarget, setTableEditorTarget] = useState<{
    tabIndex: number;
    componentId?: string;
    componentType?: "table" | "relationMatrix" | "custom";
  } | null>(null);

  const [tableConfig, setTableConfig] = useState<TableComponentConfig>({
    columns: [],
    rows: { className: [] },
    nestedRows: { enabled: false, field: "", header: "", columns: [] },
    arraySource: { enabled: false, field: "", rowIdentityField: "" },
    cache: { invalidateKeys: [] },
    addButton: undefined,
    actions: [],
  });
  const [relationMatrixConfig, setRelationMatrixConfig] =
    useState<RelationMatrixConfig>(DEFAULT_RELATION_MATRIX);
  const draftRuntimeComponent = useMemo<RuntimeComponentBlock>(
    () =>
      ({
        ...(editingComponent || {}),
        id: editingComponent?.id || createRuntimeId("cmp"),
        type: componentType,
        title,
        stateKey,
        outputs: runtimeOutputs,
        table: tableConfig,
        relationMatrix: relationMatrixConfig,
      }) as unknown as RuntimeComponentBlock,
    [
      componentType,
      editingComponent,
      runtimeOutputs,
      stateKey,
      tableConfig,
      relationMatrixConfig,
      title,
    ],
  );
  const [formConfig, setFormConfig] = useState<FormComponentConfig>(() =>
    buildDefaultFormConfig("", []),
  );
  const [infoBlocksSource, setInfoBlocksSource] =
    useState<InfoBlocksSource>("static");
  const [infoBlockItems, setInfoBlockItems] = useState<InfoBlockItemConfig[]>(
    resizeInfoBlockItems(4, []),
  );
  const [distributionBlocksSource, setDistributionBlocksSource] =
    useState<InfoBlocksSource>("static");
  const [distributionBlockItems, setDistributionBlockItems] = useState<
    DistributionBlockItemConfig[]
  >(resizeDistributionBlockItems(3, []));
  const [activeTableSettingsTab, setActiveTableSettingsTab] =
    useState<TableSettingsTab>("display");
  const tableActionSettingsId = React.useId();
  const [activeActionEditorId, setActiveActionEditorId] = useState("add");
  const [activeAddButtonFieldIndex, setActiveAddButtonFieldIndex] = useState(0);
  const [activeActionFieldIndexes, setActiveActionFieldIndexes] = useState<
    Record<string, number>
  >({});
  const [activeBulkActionEditorId, setActiveBulkActionEditorId] = useState("edit");
  const [activeBulkEditFieldIndex, setActiveBulkEditFieldIndex] = useState(0);
  const getLookupFieldOptions = (lookupSchemaName?: string) =>
    schemaFieldNames(containers || [], lookupSchemaName).map((fieldName) => ({
      value: fieldName,
      label: fieldName,
    }));
  const buildDefaultLookup = (fieldName: string) => ({
    schemaName: schemaName || "",
    matchField: "_id",
    labelField: fieldName,
  });

  const [isDynamic, setIsDynamic] = useState<boolean>(false);
  const [dynamicLimit, setDynamicLimit] = useState<number>(50);
  const [dynamicInfoBlockItem, setDynamicInfoBlockItem] =
    useState<InfoBlockItemConfig>({
      title: "",
      value: "{{value}}",
      footer: "",
      color: "",
      titleColorRules: [],
      footerColorRules: [],
    });
  const [dynamicDistributionBlockItem, setDynamicDistributionBlockItem] =
    useState<DistributionBlockItemConfig>({
      label: "",
      value: "",
      percent: "",
      color: "",
    });

  const selectedContainer = useMemo(
    () => containers.find((container) => container.schemaName === schemaName),
    [containers, schemaName],
  );
  const relationRowContainer = useMemo(
    () =>
      containers.find(
        (container) =>
          container.schemaName === relationMatrixConfig.rowSchemaName,
      ),
    [containers, relationMatrixConfig.rowSchemaName],
  );
  const relationColumnContainer = useMemo(
    () =>
      containers.find(
        (container) =>
          container.schemaName === relationMatrixConfig.columnSchemaName,
      ),
    [containers, relationMatrixConfig.columnSchemaName],
  );
  const relationTargetArray = useMemo(
    () =>
      (relationColumnContainer?.fields || []).find(
        (field) => field.name === relationMatrixConfig.targetArrayField,
      ),
    [relationColumnContainer, relationMatrixConfig.targetArrayField],
  );
  const selectedFields = useMemo(() => selectedContainer?.fields || [], [selectedContainer?.fields]);
  const arrayTableFields = useMemo(
    () => eligibleArrayFields(selectedFields),
    [selectedFields],
  );
  const selectedArrayTableField = useMemo(
    () =>
      arrayTableFields.find(
        (field) => field.name === tableConfig.arraySource?.field,
      ),
    [arrayTableFields, tableConfig.arraySource?.field],
  );
  const arrayTableIdentityFields = useMemo(
    () => eligibleIdentityFields(selectedArrayTableField),
    [selectedArrayTableField],
  );
  useEffect(() => {
    const arrayFields = new Set(
      selectedFields
        .filter((field) => field.type?.toLowerCase().includes("array"))
        .map((field) => field.name),
    );
    setTableConfig((current) => {
      let changed = false;
      const generatedRelationColumns = (
        current.generatedRelationColumns || []
      ).map((group) => {
        if (!group.arrayField || arrayFields.has(group.arrayField)) return group;
        changed = true;
        return { ...group, arrayField: "" };
      });
      return changed ? { ...current, generatedRelationColumns } : current;
    });
  }, [selectedFields]);
  const availableFormFields = useMemo(
    () => flattenFormFields(selectedFields),
    [selectedFields],
  );
  const groupByTemplateSchemaName = useMemo(
    () =>
      tabs.find((tab) => tab.components[0]?.type === "table")?.components[0]
        ?.dataBinding?.schemaName || "",
    [tabs],
  );
  const selectedGroupedContainer = useMemo(
    () =>
      containers.find(
        (container) =>
          container.schemaName ===
          (groupBy.groupedSchemaName || groupByTemplateSchemaName),
      ),
    [containers, groupBy.groupedSchemaName, groupByTemplateSchemaName],
  );
  const groupByGroupedFields = useMemo(
    () =>
      (selectedGroupedContainer?.fields || [])
        .filter((field) => field.name && field.name !== "_id")
        .map((field) => ({
          name: field.name,
          label: field.frontend?.displayName || field.name,
        })),
    [selectedGroupedContainer?.fields],
  );
  const selectedGroupByContainer = useMemo(
    () =>
      containers.find(
        (container) => container.schemaName === groupBy.sourceSchemaName,
      ),
    [containers, groupBy.sourceSchemaName],
  );
  const groupByLabelFields = useMemo(
    () =>
      (selectedGroupByContainer?.fields || []).filter(
        (field) => field.name && !["_id", "id"].includes(field.name),
      ),
    [selectedGroupByContainer?.fields],
  );
  const groupByValueFields = useMemo(
    () => [
      { name: "_id", label: "_id" },
      ...(selectedGroupByContainer?.fields || [])
        .filter((field) => field.name && field.name !== "_id")
        .map((field) => ({
          name: field.name,
          label: field.frontend?.displayName || field.name,
        })),
    ],
    [selectedGroupByContainer?.fields],
  );
  const pipelineOptions = useMemo(
    () =>
      (selectedContainer?.pipelines || [])
        .map((pipeline) => ({
          pipeline,
          outputFields: inferPipelineOutputFields(pipeline, selectedFields),
        }))
        .filter(
          ({ pipeline, outputFields }) =>
            pipeline.isActive !== false && outputFields.length > 0,
        ),
    [selectedContainer?.pipelines, selectedFields],
  );
  const projectWorkflowOptions = useMemo(
    () =>
      containers.flatMap((container) =>
        (container.workflows || [])
          .filter((workflow) => workflow.isActive !== false)
          .map((workflow) => ({
            schemaName: container.schemaName,
            workflow,
          })),
      ),
    [containers],
  );
  // Dynamic functions are paused; retain their options builder for future use.
  // const projectFunctionOptions = useMemo(
  //   () =>
  //     containers.flatMap((container) =>
  //       (container.dynamicFunctions || [])
  //         .filter((dynamicFunction) => dynamicFunction.isActive !== false)
  //         .map((dynamicFunction) => ({
  //           schemaName: container.schemaName,
  //           dynamicFunction,
  //         })),
  //     ),
  //   [containers],
  // );

  const workflowOptions = useMemo(
    () =>
      (selectedContainer?.workflows || [])
        .map((workflow) => ({
          workflow,
          outputFields: inferWorkflowOutputFields(
            workflow,
            containers,
            schemaName,
          ),
        }))
        .filter(
          ({ workflow, outputFields }) =>
            workflow.isActive !== false && outputFields.length > 0,
        ),
    [containers, schemaName, selectedContainer?.workflows],
  );

  const initializedDraft = useRef<{ component: ComponentBlock | null } | null>(null);
  // Parent page/schema refreshes must not discard the user's active draft.
  useEffect(() => {
    if (initializedDraft.current && initializedDraft.current.component === editingComponent) return;
    initializedDraft.current = { component: editingComponent };
    if (editingComponent) {
      setComponentType(editingComponent.type);
      if (editingComponent.type === "custom" && editingComponent.props?.visualBuilder) {
        try {
          const project = readStoredProject();
          setVisualSelection({ currentCopy: true, name: editingComponent.title || "Visual component", value: readVisualBlock(editingComponent), scope: { tenant: project?.tenantSlug || "", project: project?.slug || "" } });
        } catch { setVisualSelection(null); }
      }
      setTitle(editingComponent.title || "");
      setRuntimeOutputs(editingComponent.outputs || []);
      setStructuredParameters(
        (editingComponent.dataBinding?.parameters || {}) as Record<
          string,
          RuntimeParameterBinding
        >,
      );
      setStateKey(
        editingComponent.stateKey ||
          uniqueComponentStateKey(
            page,
            editingComponent.title || editingComponent.type,
            editingComponent.type,
          ),
      );
      setStateKeyTouched(!!editingComponent.stateKey);
      setBindingIssues([]);
      if (editingComponent.type === "relationMatrix") {
        setRelationMatrixConfig({
          ...DEFAULT_RELATION_MATRIX,
          ...(editingComponent.relationMatrix || {}),
        });
      }

      if (editingComponent.dataBinding) {
        setTableSourceType(
          editingComponent.dataBinding.kind === "pipeline" ||
            editingComponent.dataBinding.kind === "workflow"
            ? editingComponent.dataBinding.kind
            : "schema",
        );
        setSchemaName(editingComponent.dataBinding.schemaName || "");
        setPipelineName(editingComponent.dataBinding.pipelineName || "");
        setWorkflowName(editingComponent.dataBinding.workflowName || "");

        const initialParams = editingComponent.dataBinding.params || {};
        const map: Record<string, string> = {};
        for (const [k, v] of Object.entries(initialParams)) {
          map[k] = typeof v === "object" ? JSON.stringify(v) : String(v);
        }
        setParamsMap(map);

        setParams(
          editingComponent.dataBinding.params
            ? JSON.stringify(editingComponent.dataBinding.params, null, 2)
            : "",
        );
      }

      if (CHART_TYPES.some((c) => c.value === editingComponent.type)) {
        const props = editingComponent.props || {};
        const chartOptions = props.chartOptions || {};

        setChartProps({
          height: props.height || 400,
          ...chartOptions,
        });

        const specificFields =
          CHART_SPECIFIC_OPTIONS[editingComponent.type] || [];
        const specificKeys = [
          "height",
          "colors",
          ...specificFields.map((f) => f.name),
        ];

        const restOptions: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(chartOptions)) {
          if (!specificKeys.includes(k)) {
            restOptions[k] = v;
          }
        }
        setCustomChartOptions(
          Object.keys(restOptions).length > 0
            ? JSON.stringify(restOptions, null, 2)
            : "",
        );
      }

      setTabs(editingComponent.tabs || []);
      setGroupBy(editingComponent.groupBy || EMPTY_GROUP_BY);
      if (editingComponent.type === "infoBlocks") {
        const infoBlocks = editingComponent.props?.infoBlocks as
          | InfoBlocksConfig
          | undefined;
        const nextSource =
          infoBlocks?.source ||
          (editingComponent.dataBinding?.kind as
            | InfoBlocksSource
            | undefined) ||
          "static";
        setInfoBlocksSource(nextSource);
        setInfoBlockItems(
          resizeInfoBlockItems(
            Math.min(Math.max(infoBlocks?.items?.length || 4, 1), 5),
            infoBlocks?.items || [],
          ),
        );
        setIsDynamic(infoBlocks?.isDynamic || false);
        setDynamicLimit(infoBlocks?.dynamicLimit || 50);
        setDynamicInfoBlockItem(
          infoBlocks?.dynamicItem || {
            title: "",
            value: "{{value}}",
            footer: "",
            color: "",
          },
        );
      }
      if (editingComponent.type === "distributionBlocks") {
        const distributionBlocks = editingComponent.props
          ?.distributionBlocks as DistributionBlocksConfig | undefined;
        const nextSource =
          distributionBlocks?.source ||
          (editingComponent.dataBinding?.kind as
            | InfoBlocksSource
            | undefined) ||
          "static";
        setDistributionBlocksSource(nextSource);
        setDistributionBlockItems(
          resizeDistributionBlockItems(
            Math.min(Math.max(distributionBlocks?.items?.length || 3, 1), 5),
            distributionBlocks?.items || [],
          ),
        );
        setIsDynamic(distributionBlocks?.isDynamic || false);
        setDynamicLimit(distributionBlocks?.dynamicLimit || 50);
        setDynamicDistributionBlockItem(
          distributionBlocks?.dynamicItem || {
            label: "",
            value: "",
            percent: "",
            color: "",
          },
        );
      }
      if (
        editingComponent.type === "tabPanel" &&
        !editingComponent.dataBinding?.schemaName &&
        editingComponent.groupBy?.groupedSchemaName
      ) {
        setSchemaName(editingComponent.groupBy.groupedSchemaName);
      }

      if (editingComponent.type === "form") {
        const formSchemaName =
          editingComponent.form?.schemaName ||
          editingComponent.dataBinding?.schemaName ||
          "";
        const formFields =
          containers.find(
            (container) => container.schemaName === formSchemaName,
          )?.fields || [];
        setSchemaName(formSchemaName);
        setFormConfig(
          editingComponent.form ||
            buildDefaultFormConfig(formSchemaName, formFields),
        );
      }

      if (editingComponent.table) {
        const editingSourceType =
          editingComponent.dataBinding?.kind === "pipeline" ||
          editingComponent.dataBinding?.kind === "workflow"
            ? editingComponent.dataBinding.kind
            : "schema";
        const editingSchemaFields =
          containers.find(
            (container) =>
              container.schemaName === editingComponent.dataBinding?.schemaName,
          )?.fields || [];
        setTableConfig(
          hydrateDesignerTableConfigForEditing(editingComponent.table, {
            columns: editingComponent.table.columns || [],
            rows: { className: editingComponent.table.rows?.className || [] },
            nestedRows: editingComponent.table.nestedRows || {
              enabled: false,
              field: "",
              header: "",
              columns: [],
            },
            arraySource: editingComponent.table.arraySource || {
              enabled: false,
              field: "",
              rowIdentityField: "",
            },
            cache: {
              invalidateKeys: editingComponent.table.cache?.invalidateKeys || [],
            },
            constantFilters: editingComponent.table.constantFilters,
            constantSort: editingComponent.table.constantSort,
            drag: editingComponent.table.drag,
            addButton:
              editingSourceType === "schema"
                ? hydrateSchemaAddButton(
                    editingComponent.table.addButton,
                    editingComponent.table.actions,
                    editingSchemaFields,
                  )
                : editingComponent.table.addButton,
            actions: (
              editingComponent.table.actions &&
              editingComponent.table.actions.length
                ? editingSourceType === "schema"
                  ? hydrateSchemaEditActionFields(
                      editingComponent.table.actions,
                      editingSchemaFields,
                    )
                  : editingComponent.table.actions
                : getDefaultActionsForSource(
                    editingSourceType,
                    editingSchemaFields,
                  )
            ).map((action) => ({
              ...action,
              id: action.id || action.key || `action-${crypto.randomUUID()}`,
            })),
            bulkActions:
              editingComponent.table.bulkActions ||
              (editingSourceType === "schema"
                ? {
                    edit: buildDefaultBulkEditAction(editingSchemaFields),
                    delete: buildDefaultBulkDeleteAction(),
                  }
                : undefined),
            filterPanel:
              editingComponent.table.filterPanel !== undefined
                ? {
                    inputs: editingComponent.table.filterPanel.inputs || [],
                  }
                : {
                    inputs: buildFilterPanelInputsFromFields(
                      editingSchemaFields,
                    ),
                  },
            toggles: editingComponent.table.toggles || [],
            generatedRelationColumns:
              editingComponent.table.generatedRelationColumns || [],
          }),
        );
      }
    } else {
      setGroupBy(EMPTY_GROUP_BY);
      setTabs([]);
      setInfoBlocksSource("static");
      setInfoBlockItems(resizeInfoBlockItems(4, []));
      setDistributionBlocksSource("static");
      setDistributionBlockItems(resizeDistributionBlockItems(3, []));
      setFormConfig(buildDefaultFormConfig("", []));
      setRelationMatrixConfig(DEFAULT_RELATION_MATRIX);
      setIsDynamic(false);
      setDynamicLimit(50);
      setDynamicInfoBlockItem({
        title: "",
        value: "{{value}}",
        footer: "",
        color: "",
      });
      setDynamicDistributionBlockItem({
        label: "",
        value: "",
        percent: "",
        color: "",
      });
      setChartProps({
        height: 400,
        colors: { scheme: "nivo" },
      });
      setCustomChartOptions("");
      setParamsMap({});
      setParams("");
      setStructuredParameters({});
      setRuntimeOutputs([]);
      setStateKey(uniqueComponentStateKey(page, "table", "table"));
      setStateKeyTouched(false);
      setBindingIssues([]);
    }
  }, [containers, editingComponent, page]);

  useEffect(() => {
    if (stateKeyTouched || editingComponent?.stateKey) return;
    setStateKey(
      uniqueComponentStateKey(page, title || componentType, componentType),
    );
  }, [componentType, editingComponent?.stateKey, page, stateKeyTouched, title]);

  useEffect(() => {
    if (
      !["table", "tabPanel"].includes(componentType) ||
      activeTableSettingsTab !== "bulkActions"
    ) {
      return;
    }

    setTableConfig((current) =>
      current.bulkActions
        ? current
        : {
            ...current,
            bulkActions: {
              edit: buildDefaultBulkEditAction(selectedFields),
              delete: buildDefaultBulkDeleteAction(),
            },
          },
    );
  }, [activeTableSettingsTab, componentType, selectedFields]);

  useEffect(() => {
    if (componentType !== "table") return;
    const inputs = tableConfig.filterPanel?.inputs;
    if (!inputs?.some((input) => !input.id)) return;
    setTableConfig((current) => ({
      ...current,
      filterPanel: {
        ...current.filterPanel,
        inputs: (current.filterPanel?.inputs || []).map((input) =>
          input.id ? input : { ...input, id: createRuntimeId("tfl") },
        ),
      },
    }));
  }, [componentType, tableConfig.filterPanel?.inputs]);

  useEffect(() => {
    if (
      !shouldHydrateEmptyDesignerTableColumns({
        componentType,
        tableSourceType,
        schemaName,
        columnCount: tableConfig.columns?.length || 0,
        isEditingExistingTable: Boolean(editingComponent?.table),
      })
    ) {
      return;
    }

    const container = containers.find((item) => item.schemaName === schemaName);
    if (!container) return;

    setTableConfig((current) => {
      if (current.columns && current.columns.length > 0) return current;
      const hydrated = hydrateEmptyDesignerTableColumns(
        current,
        container.fields || [],
      );

      return {
        ...hydrated,
        addButton:
          current.addButton ||
          hydrateSchemaAddButton(
            current.addButton,
            current.actions,
            container.fields || [],
          ),
        actions:
          current.actions && current.actions.length > 0
            ? hydrateSchemaEditActionFields(
                current.actions,
                container.fields || [],
              )
            : getDefaultActionsForSource("schema", container.fields || []),
        filterPanel:
          current.filterPanel !== undefined &&
          current.filterPanel.inputs !== undefined
            ? current.filterPanel
            : {
                inputs: buildFilterPanelInputsFromFields(
                  container.fields || [],
                ),
              },
      };
    });
  }, [
    componentType,
    containers,
    editingComponent?.table,
    schemaName,
    tableConfig.columns,
    tableSourceType,
  ]);

  useEffect(() => {
    if (componentType !== "form" || !schemaName || editingComponent?.form) {
      return;
    }
    const container = containers.find((item) => item.schemaName === schemaName);
    if (!container) return;
    setFormConfig((current) => {
      if (current.schemaName === schemaName && current.fields?.length) {
        return current;
      }
      return buildDefaultFormConfig(schemaName, container.fields || []);
    });
  }, [componentType, containers, editingComponent?.form, schemaName]);

  useEffect(() => {
    if (
      !["table", "tabPanel"].includes(componentType) ||
      activeTableSettingsTab !== "bulkActions" ||
      tableConfig.bulkActions?.edit ||
      tableConfig.bulkActions?.delete
    ) {
      return;
    }

    setTableConfig((current) => {
      if (current.bulkActions?.edit || current.bulkActions?.delete) {
        return current;
      }

      return ensureDesignerTableBulkActions(current, {
        edit: buildDefaultBulkEditAction(selectedFields),
        delete: buildDefaultBulkDeleteAction(),
      });
    });
  }, [
    activeTableSettingsTab,
    componentType,
    selectedFields,
    tableConfig.bulkActions?.delete,
    tableConfig.bulkActions?.edit,
  ]);

  useEffect(() => {
    if (
      CHART_TYPES.some((c) => c.value === componentType) &&
      tableSourceType === "schema"
    ) {
      setTableSourceType("pipeline");
    }
  }, [componentType, tableSourceType]);

  useEffect(() => {
    if (componentType !== "table" || tableSourceType !== "pipeline") {
      return;
    }

    const selected = pipelineOptions.find(
      ({ pipeline }) => pipeline.name === pipelineName,
    );
    if (!selected) {
      setPipelineName("");
      return;
    }

    setTableConfig((current) => ({
      ...current,
      columns: mergeDesignerTableColumnsFromNames(
        current.columns,
        selected.outputFields,
      ),
    }));
  }, [componentType, pipelineName, pipelineOptions, tableSourceType]);

  useEffect(() => {
    if (componentType !== "table" || tableSourceType !== "workflow") {
      return;
    }

    const selected = workflowOptions.find(
      ({ workflow }) => workflow.name === workflowName,
    );
    if (!selected) {
      setWorkflowName("");
      return;
    }

    setTableConfig((current) => ({
      ...current,
      columns: mergeDesignerTableColumnsFromNames(
        current.columns,
        selected.outputFields,
      ),
    }));
  }, [componentType, tableSourceType, workflowName, workflowOptions]);

  const selectedPipeline = useMemo(() => {
    const activeName = pipelineName;
    if (!activeName) return null;
    return (
      pipelineOptions.find(({ pipeline }) => pipeline.name === activeName)
        ?.pipeline || null
    );
  }, [pipelineName, pipelineOptions]);

  const selectedWorkflow = useMemo(() => {
    const activeName = workflowName;
    if (!activeName) return null;
    return (
      workflowOptions.find(({ workflow }) => workflow.name === activeName)
        ?.workflow || null
    );
  }, [workflowName, workflowOptions]);

  useEffect(() => {
    const detectedParams: string[] = [];
    if (selectedPipeline) {
      detectedParams.push(...extractPipelineParams(selectedPipeline));
    } else if (selectedWorkflow) {
      detectedParams.push(...extractWorkflowParams(selectedWorkflow));
    }

    if (detectedParams.length > 0) {
      setParamsMap((prev) => {
        const next = { ...prev };
        let changed = false;
        for (const p of detectedParams) {
          if (!(p in next)) {
            next[p] = "";
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }
  }, [selectedPipeline, selectedWorkflow]);

  const handleParamChange = (key: string, val: string) => {
    const updated = { ...paramsMap, [key]: val };
    setParamsMap(updated);
    syncParamsJson(updated);
  };

  const handleRemoveParam = (key: string) => {
    const updated = { ...paramsMap };
    delete updated[key];
    setParamsMap(updated);
    syncParamsJson(updated);
  };

  const handleAddCustomParam = () => {
    const trimmed = customParamKey.trim();
    if (!trimmed) return;
    if (trimmed in paramsMap) {
      alert("Parameter already exists.");
      return;
    }
    const updated = { ...paramsMap, [trimmed]: "" };
    setParamsMap(updated);
    setCustomParamKey("");
    syncParamsJson(updated);
  };

  const syncParamsJson = (map: Record<string, string>) => {
    const cleanedParams: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(map)) {
      if (v === "") continue;

      if (/^\d+$/.test(v)) {
        cleanedParams[k] = parseInt(v, 10);
      } else if (/^\d+\.\d+$/.test(v)) {
        cleanedParams[k] = parseFloat(v);
      } else if (v === "true") {
        cleanedParams[k] = true;
      } else if (v === "false") {
        cleanedParams[k] = false;
      } else {
        try {
          if (
            (v.startsWith("{") && v.endsWith("}")) ||
            (v.startsWith("[") && v.endsWith("]"))
          ) {
            cleanedParams[k] = JSON.parse(v);
          } else {
            cleanedParams[k] = v;
          }
        } catch {
          cleanedParams[k] = v;
        }
      }
    }
    setParams(JSON.stringify(cleanedParams, null, 2));
  };

  const handleRawJsonChange = (val: string) => {
    setParams(val);
    try {
      const parsed = JSON.parse(val);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const nextMap: Record<string, string> = {};
        for (const [k, v] of Object.entries(parsed)) {
          nextMap[k] = typeof v === "object" ? JSON.stringify(v) : String(v);
        }

        const detectedParams: string[] = [];
        if (selectedPipeline) {
          detectedParams.push(...extractPipelineParams(selectedPipeline));
        } else if (selectedWorkflow) {
          detectedParams.push(...extractWorkflowParams(selectedWorkflow));
        }
        for (const p of detectedParams) {
          if (!(p in nextMap)) {
            nextMap[p] = "";
          }
        }

        setParamsMap(nextMap);
      }
    } catch {
      // Ignore typing errors
    }
  };

  const handleChartPropChange = (name: string, value: unknown) => {
    setChartProps((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isChartConfigInvalid = (): boolean => {
    if (!CHART_TYPES.some((c) => c.value === componentType)) return false;

    const specificFields = CHART_SPECIFIC_OPTIONS[componentType] || [];
    for (const field of specificFields) {
      if (field.required) {
        const val = chartProps[field.name];
        if (val === undefined || val === null || String(val).trim() === "") {
          return true;
        }
      }
    }
    return false;
  };

  const applyRuntimeBindings = (component: ComponentBlock): ComponentBlock => {
    const requestedStateKey = componentType === "custom" && !stateKeyTouched && !editingComponent?.stateKey
      ? component.id
      : stateKey.trim() || title || componentType;
    const next: ComponentBlock = {
      ...component,
      id: isSafeRuntimeName(component.id)
        ? component.id
        : createRuntimeId("cmp"),
      stateKey: resolveComponentStateKey(
        page,
        editingComponent?.id,
        requestedStateKey,
        componentType,
      ),
    };

    if (
      runtimeOutputs.length > 0 ||
      (editingComponent?.outputs?.length ?? 0) > 0
    ) {
      next.outputs = runtimeOutputs;
    }

    if (next.dataBinding) {
      const parameterEntries = Object.entries(structuredParameters).filter(
        ([parameter]) => parameter.trim(),
      );
      if (
        parameterEntries.length > 0 ||
        Object.keys(editingComponent?.dataBinding?.parameters || {}).length > 0
      ) {
        next.dataBinding = {
          ...next.dataBinding,
          parameters: Object.fromEntries(parameterEntries),
        } as ComponentBlock["dataBinding"];
      }
    }

    return next;
  };

  const pageWithSavedComponent = (
    component: ComponentBlock,
  ): RuntimePageModel => {
    const runtimeComponent = component as unknown as NonNullable<
      NonNullable<RuntimePageModel["sections"]>[number]["component"]
    >;
    const sections = (page.sections || []).map((section) => ({
      ...section,
      cells: (section.cells || []).map((cell) => {
        if (cell.id !== currentCellId) return cell;
        const components = editingComponent
          ? (cell.components || []).map((candidate) =>
              candidate.id === editingComponent.id
                ? runtimeComponent
                : candidate,
            )
          : [...(cell.components || []), runtimeComponent];
        return { ...cell, components };
      }),
    }));
    return { ...page, sections };
  };

  const validateComponentBindings = (component: ComponentBlock): boolean => {
    const issues = validatePageBindings(pageWithSavedComponent(component));
    const visibleIssues = issues.filter(
      (issue) =>
        issue.componentId === component.id ||
        issue.path.includes(currentCellId),
    );
    setBindingIssues(visibleIssues);
    return visibleIssues.length === 0;
  };

  const handleAdd = async () => {
    let component: ComponentBlock = {
      ...(editingComponent || {}),
      id:
        editingComponent?.id && isSafeRuntimeName(editingComponent.id)
          ? editingComponent.id
          : createRuntimeId("cmp"),
      type: componentType as ComponentBlock["type"],
      title,
      order: editingComponent?.order || 1,
    };

    const validateTableFilterRules = (table?: ComponentBlock["table"]): string[] => [
      ...validateSelectFilterBindings(table?.filterPanel?.inputs || []),
      ...validateSelectFilterBindings(table?.addButton?.formFields || []),
      ...(table?.actions || []).flatMap((action) =>
        validateSelectFilterBindings(action.formFields || []),
      ),
      ...validateSelectFilterBindings(
        table?.bulkActions?.edit?.formFields || [],
      ),
    ];

    if (componentType === "custom") {
      const project = readStoredProject();
      if (!visualSelection || visualSelection.scope.tenant !== project?.tenantSlug || visualSelection.scope.project !== project?.slug) {
        setSaveError("Choose a visual design from the current project before adding it.");
        return;
      }
      if (visualSelection.currentCopy && editingComponent) {
        component.props = structuredClone(editingComponent.props);
      } else {
        const copied = copyVisualDesign(visualSelection.value, title || visualSelection.name);
        component = { ...component, ...copied, props: { ...component.props, ...copied.props } };
        if (editingComponent) component.id = editingComponent.id;
      }
    } else if (componentType === "table") {
      let parsedParams = undefined;
      if (params.trim()) {
        try {
          parsedParams = JSON.parse(params);
        } catch (e) {
          logger.error("Invalid params JSON:", e);
        }
      }

      component.dataBinding = {
        kind: tableSourceType,
        schemaName,
        ...(tableSourceType === "pipeline" && { pipelineName }),
        ...(tableSourceType === "workflow" && { workflowName }),
        ...(parsedParams && { params: parsedParams }),
      };
      component.table = cleanTableConfig(tableConfig);
      const tableErrors = validateTableFilterRules(component.table);
      if (tableErrors.length) {
        setSaveError(tableErrors[0]);
        return;
      }
    } else if (componentType === "relationMatrix") {
      component.relationMatrix = cleanRelationMatrixConfig(
        relationMatrixConfig,
      );
      const matrixErrors = validateSelectFilterBindings(
        component.relationMatrix?.filterPanel?.inputs || [],
      );
      if (matrixErrors.length) {
        setSaveError(matrixErrors[0]);
        return;
      }
    } else if (componentType === "form") {
      const cleanedForm = cleanFormConfig({
        ...formConfig,
        title: formConfig.title || title,
        schemaName: formConfig.schemaName || schemaName,
      });
      const formErrors = validateSelectFilterBindings(cleanedForm.fields || []);
      if (formErrors.length) {
        setSaveError(formErrors[0]);
        return;
      }
      component.dataBinding = {
        kind: "schema",
        schemaName: cleanedForm.schemaName,
      };
      component.form = cleanedForm;
    } else if (componentType === "tabPanel") {
      const groupedSchemaName = (
        groupBy.groupedSchemaName ||
        groupByTemplateSchemaName ||
        schemaName ||
        ""
      ).trim();
      const groupedField = (
        groupBy.groupedField ||
        groupBy.filterField ||
        groupBy.groupByObjectId ||
        ""
      ).trim();
      const sourceSchemaName = (groupBy.sourceSchemaName || "").trim();
      const sourceValueField = (groupBy.sourceValueField || "_id").trim();
      const sourceLabelField = (
        groupBy.sourceLabelField ||
        groupBy.groupByField ||
        ""
      ).trim();
      const cleanGroupBy = {
        groupByObjectId: groupedField,
        groupByField: sourceLabelField,
        groupedSchemaName,
        groupedField,
        sourceSchemaName,
        sourceValueField,
        sourceLabelField,
        filterField: groupedField,
      };

      const cleanedTabs = tabs.map((tab) => ({
        ...tab,
        components: (tab.components || []).map((comp) =>
          comp.table ? { ...comp, table: cleanTableConfig(comp.table) } : comp,
        ),
      }));
      const tabTableErrors = cleanedTabs.flatMap((tab) =>
        (tab.components || []).flatMap((comp) =>
          validateTableFilterRules(comp.table),
        ),
      );
      if (tabTableErrors.length) {
        setSaveError(tabTableErrors[0]);
        return;
      }
      component.tabs = cleanedTabs;
      if (
        cleanGroupBy.groupedSchemaName &&
        cleanGroupBy.groupedField &&
        cleanGroupBy.sourceSchemaName &&
        cleanGroupBy.sourceLabelField
      ) {
        component.dataBinding = {
          kind: "schema",
          schemaName: cleanGroupBy.groupedSchemaName,
        };
        const firstTabTable = cleanedTabs
          .flatMap((tab) => tab.components || [])
          .find((comp) => comp.table)?.table;
        component.table = firstTabTable || cleanTableConfig(tableConfig);
        component.groupBy = cleanGroupBy;
      }
    } else if (componentType === "infoBlocks") {
      let parsedParams = undefined;
      if (params.trim()) {
        try {
          parsedParams = JSON.parse(params);
        } catch (e) {
          logger.error("Invalid params JSON:", e);
        }
      }

      component.props = {
        infoBlocks: {
          source: infoBlocksSource,
          items: isDynamic ? undefined : infoBlockItems,
          isDynamic,
          dynamicLimit: isDynamic ? dynamicLimit : undefined,
          dynamicItem: isDynamic ? dynamicInfoBlockItem : undefined,
        } satisfies InfoBlocksConfig,
      };

      if (infoBlocksSource !== "static") {
        component.dataBinding = {
          kind: infoBlocksSource,
          schemaName,
          ...(infoBlocksSource === "pipeline" && { pipelineName }),
          ...(infoBlocksSource === "workflow" && { workflowName }),
          ...(parsedParams && { params: parsedParams }),
        };
      }
    } else if (componentType === "distributionBlocks") {
      let parsedParams = undefined;
      if (params.trim()) {
        try {
          parsedParams = JSON.parse(params);
        } catch (e) {
          logger.error("Invalid params JSON:", e);
        }
      }

      component.props = {
        distributionBlocks: {
          source: distributionBlocksSource,
          items: isDynamic ? undefined : distributionBlockItems,
          isDynamic,
          dynamicLimit: isDynamic ? dynamicLimit : undefined,
          dynamicItem: isDynamic ? dynamicDistributionBlockItem : undefined,
        } satisfies DistributionBlocksConfig,
      };

      if (distributionBlocksSource !== "static") {
        component.dataBinding = {
          kind: distributionBlocksSource,
          schemaName,
          ...(distributionBlocksSource === "pipeline" && { pipelineName }),
          ...(distributionBlocksSource === "workflow" && { workflowName }),
          ...(parsedParams && { params: parsedParams }),
        };
      }
    } else if (CHART_TYPES.find((c) => c.value === componentType)) {
      let parsedParams = undefined;
      if (params.trim()) {
        try {
          parsedParams = JSON.parse(params);
          logger.debug("✅ Parsed params:", parsedParams);
        } catch (e) {
          logger.error("Invalid params JSON:", e);
        }
      }

      let parsedCustomOptions = {};
      if (customChartOptions.trim()) {
        try {
          parsedCustomOptions = JSON.parse(customChartOptions);
        } catch (e) {
          logger.error("Invalid custom chart options JSON:", e);
        }
      }

      const compiledChartOptions: Record<string, unknown> = {
        colors: chartProps.colors || { scheme: "nivo" },
        ...parsedCustomOptions,
      };

      const specificFields = CHART_SPECIFIC_OPTIONS[componentType] || [];
      for (const field of specificFields) {
        const val = chartProps[field.name];
        if (val === undefined || val === "") continue;

        if (field.type === "array") {
          compiledChartOptions[field.name] = String(val)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        } else if (field.type === "number") {
          compiledChartOptions[field.name] = Number(val);
        } else if (field.type === "boolean") {
          compiledChartOptions[field.name] = Boolean(val);
        } else {
          compiledChartOptions[field.name] = val;
        }
      }

      const isWorkflow = tableSourceType === "workflow";
      component.dataBinding = {
        kind: isWorkflow ? "workflow" : "pipeline",
        schemaName,
        ...(isWorkflow ? { workflowName } : { pipelineName }),
        ...(parsedParams && { params: parsedParams }),
      };

      component.props = {
        height: Number(chartProps.height || 400),
        chartOptions: compiledChartOptions,
      };

      logger.debug("📊 Chart component created with props:", component);
    }

    component = applyRuntimeBindings(component);
    if (!validateComponentBindings(component)) return;
    if (savingRef.current) return;
    savingRef.current = true;
    setIsSaving(true);
    setSaveError("");
    try {
      await onAdd(component);
    } catch {
      setSaveError(t("Your component could not be saved. Your changes are still here. Please try again."));
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  };

  const resetTableColumnsForSchema = (nextSchemaName: string) => {
    const container = containers.find(
      (item) => item.schemaName === nextSchemaName,
    );
    setTableConfig({
      columns: buildTableColumnsFromFields(container?.fields || []),
      rows: { className: [] },
      arraySource: { enabled: false, field: "", rowIdentityField: "" },
      nestedRows: { enabled: false, field: "", header: "", columns: [] },
      cache: { invalidateKeys: [] },
      addButton: buildDefaultCreateAction(container?.fields || []),
      actions: getDefaultActionsForSource("schema", container?.fields || []),
    });
  };

  const updateTableColumn = (
    fieldName: string,
    updates: Partial<TableColumnConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName ? { ...column, ...updates } : column,
      ),
    }));
  };

  const addTableColumn = () => {
    setTableConfig((current) => {
      const columns = current.columns || [];
      let index = columns.length + 1;
      let field = `field${index}`;
      while (columns.some((column) => column.field === field)) {
        index += 1;
        field = `field${index}`;
      }
      return {
        ...current,
        columns: [...columns, { field, type: "field", displayName: "" }],
      };
    });
  };

  const addTableComputedLabelRule = (fieldName: string) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              computedLabelRules: [
                ...(column.computedLabelRules || []),
                { condition: "", value: "" },
              ],
            }
          : column,
      ),
    }));
  };

  const updateTableComputedLabelRule = (
    fieldName: string,
    ruleIndex: number,
    updates: Partial<
      NonNullable<TableColumnConfig["computedLabelRules"]>[number]
    >,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) => {
        if (column.field !== fieldName) return column;
        const rules = [...(column.computedLabelRules || [])];
        rules[ruleIndex] = { ...rules[ruleIndex], ...updates };
        return { ...column, computedLabelRules: rules };
      }),
    }));
  };

  const removeTableComputedLabelRule = (
    fieldName: string,
    ruleIndex: number,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              computedLabelRules: (column.computedLabelRules || []).filter(
                (_, index) => index !== ruleIndex,
              ),
            }
          : column,
      ),
    }));
  };

  const updateTableProgressBar = (
    fieldName: string,
    updates: Partial<NonNullable<TableColumnConfig["progressBar"]>>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              progressBar: {
                sourceField: column.progressBar?.sourceField || column.field,
                max: column.progressBar?.max ?? 8,
                color: column.progressBar?.color || "#4d9f24",
                trackColor: column.progressBar?.trackColor || "#e7e5df",
                height: column.progressBar?.height ?? 12,
                width: column.progressBar?.width ?? 260,
                showValue: column.progressBar?.showValue ?? true,
                ...(column.progressBar || {}),
                ...updates,
              },
            }
          : column,
      ),
    }));
  };

  const addTableProgressBarColorRule = (fieldName: string) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              progressBar: {
                sourceField: column.progressBar?.sourceField || column.field,
                max: column.progressBar?.max ?? 8,
                color: column.progressBar?.color || "#4d9f24",
                trackColor: column.progressBar?.trackColor || "#e7e5df",
                height: column.progressBar?.height ?? 12,
                width: column.progressBar?.width ?? 260,
                showValue: column.progressBar?.showValue ?? true,
                ...(column.progressBar || {}),
                colorRules: [
                  ...(column.progressBar?.colorRules || []),
                  { condition: "", color: "#4d9f24" },
                ],
              },
            }
          : column,
      ),
    }));
  };

  const updateTableProgressBarColorRule = (
    fieldName: string,
    ruleIndex: number,
    updates: Partial<
      NonNullable<
        NonNullable<TableColumnConfig["progressBar"]>["colorRules"]
      >[number]
    >,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) => {
        if (column.field !== fieldName) return column;
        const colorRules = [...(column.progressBar?.colorRules || [])];
        colorRules[ruleIndex] = { ...colorRules[ruleIndex], ...updates };
        return {
          ...column,
          progressBar: {
            ...(column.progressBar || {}),
            sourceField: column.progressBar?.sourceField || column.field,
            colorRules,
          },
        };
      }),
    }));
  };

  const removeTableProgressBarColorRule = (
    fieldName: string,
    ruleIndex: number,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              progressBar: {
                ...(column.progressBar || {}),
                sourceField: column.progressBar?.sourceField || column.field,
                colorRules: (column.progressBar?.colorRules || []).filter(
                  (_, index) => index !== ruleIndex,
                ),
              },
            }
          : column,
      ),
    }));
  };

  const removeTableColumn = (fieldName: string) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).filter(
        (column) => column.field !== fieldName,
      ),
    }));
  };

  const addTableConstantFilter = () => {
    setTableConfig((current) => {
      const filters = { ...(current.constantFilters || {}) };
      let index = Object.keys(filters).length + 1;
      let key = `filter${index}`;
      while (Object.prototype.hasOwnProperty.call(filters, key)) {
        index += 1;
        key = `filter${index}`;
      }
      filters[key] = "";
      return { ...current, constantFilters: filters };
    });
  };

  const updateTableConstantFilter = (
    previousKey: string,
    nextKey: string,
    nextValue: unknown,
  ) => {
    setTableConfig((current) => {
      const filters = { ...(current.constantFilters || {}) };
      delete filters[previousKey];
      filters[nextKey] = nextValue;
      return { ...current, constantFilters: filters };
    });
  };

  const removeTableConstantFilter = (key: string) => {
    setTableConfig((current) => {
      const filters = { ...(current.constantFilters || {}) };
      delete filters[key];
      return {
        ...current,
        constantFilters: Object.keys(filters).length ? filters : undefined,
      };
    });
  };

  const updateTableConstantSort = (
    updates: NonNullable<TableComponentConfig["constantSort"]>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      constantSort: {
        asc: 1,
        ...(current.constantSort || {}),
        ...updates,
      },
    }));
  };

  const addTableToggle = () => {
    setTableConfig((current) => {
      const usedIds = new Set((current.toggles || []).map((toggle) => toggle.id));
      let index = (current.toggles || []).length + 1;
      let id = `toggle${index}`;
      while (usedIds.has(id)) {
        index += 1;
        id = `toggle${index}`;
      }
      return {
        ...current,
        toggles: [
          ...(current.toggles || []),
          createDesignerTableToggle(id),
        ],
      };
    });
  };

  const updateTableToggle = (
    index: number,
    updates: Partial<TableToggleConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      toggles: (current.toggles || []).map((toggle, toggleIndex) =>
        toggleIndex === index ? { ...toggle, ...updates } : toggle,
      ),
    }));
  };

  const updateTableToggleRequestEffect = (
    index: number,
    state: "on" | "off",
    effect: ToggleRequestEffect | undefined,
  ) => {
    setTableConfig((current) => ({
      ...current,
      toggles: (current.toggles || []).map((toggle, toggleIndex) => {
        if (toggleIndex !== index) return toggle;
        const request = { ...(toggle.request || {}), [state]: effect };
        return { ...toggle, request };
      }),
    }));
  };

  const updateTableToggleVisibilityTarget = (
    toggleId: string,
    target: DesignerVisibilityTarget,
    checked: boolean,
  ) => {
    setTableConfig((current) => {
      const selected = getDesignerToggleVisibilityTargets(current, toggleId);
      const nextTargets = checked
        ? [...new Set([...selected, target])]
        : selected.filter((candidate) => candidate !== target);
      return setDesignerToggleVisibilityTargets(
        current,
        toggleId,
        nextTargets,
      );
    });
  };

  const moveTableToggle = (index: number, direction: -1 | 1) => {
    setTableConfig((current) => ({
      ...current,
      toggles: moveArrayItem(current.toggles || [], index, direction),
    }));
  };

  const removeTableToggle = (index: number) => {
    setTableConfig((current) => {
      const removedId = current.toggles?.[index]?.id;
      return {
        ...current,
        toggles: (current.toggles || []).filter(
          (_, toggleIndex) => toggleIndex !== index,
        ),
        columns: (current.columns || []).map((column) => ({
          ...column,
          ...(column.visibilityToggle?.toggleId === removedId
            ? { visibilityToggle: undefined }
            : {}),
          ...(column.booleanEditToggle?.toggleId === removedId
            ? { booleanEditToggle: undefined }
            : {}),
          ...(column.booleanDisplayToggle?.toggleId === removedId
            ? { booleanDisplayToggle: undefined }
            : {}),
        })),
        generatedRelationColumns: (current.generatedRelationColumns || []).map(
          (group) => ({
            ...group,
            ...(group.visibilityToggle?.toggleId === removedId
              ? { visibilityToggle: undefined }
              : {}),
            ...(group.booleanEditToggle?.toggleId === removedId
              ? { booleanEditToggle: undefined }
              : {}),
          }),
        ),
      };
    });
  };

  const addGeneratedRelationColumns = () => {
    setTableConfig((current) => {
      const groups = current.generatedRelationColumns || [];
      let suffix = groups.length + 1;
      while (groups.some((group) => group.id === `relation${suffix}`)) suffix += 1;
      return {
        ...current,
        generatedRelationColumns: [
          ...groups,
          {
            id: `relation${suffix}`,
            arrayField: "",
            sourceSchemaName: "",
            sourceIdField: "_id",
            sourceLabelField: "",
            sourceLimit: 100,
          },
        ],
      };
    });
  };

  const updateGeneratedRelationColumns = (
    index: number,
    updates: Partial<GeneratedRelationColumnsConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      generatedRelationColumns: (current.generatedRelationColumns || []).map(
        (group, groupIndex) =>
          groupIndex === index ? { ...group, ...updates } : group,
      ),
    }));
  };

  const moveGeneratedRelationColumns = (index: number, direction: -1 | 1) =>
    setTableConfig((current) => ({
      ...current,
      generatedRelationColumns: moveArrayItem(
        current.generatedRelationColumns || [],
        index,
        direction,
      ),
    }));

  const removeGeneratedRelationColumns = (index: number) =>
    setTableConfig((current) => ({
      ...current,
      generatedRelationColumns: (current.generatedRelationColumns || []).filter(
        (_, groupIndex) => groupIndex !== index,
      ),
    }));

  const parseToggleRequestValue = (value: string): JsonValue => {
    try {
      return JSON.parse(value) as JsonValue;
    } catch {
      return value;
    }
  };

  const updateTableNestedRows = (
    updates: Partial<NonNullable<TableComponentConfig["nestedRows"]>>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      nestedRows: {
        enabled: false,
        field: "",
        header: "",
        columns: [],
        ...(current.nestedRows || {}),
        ...updates,
      },
    }));
  };

  const updateTableArraySource = (
    updates: Partial<NonNullable<TableComponentConfig["arraySource"]>>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      dataMode: updates.enabled === true ? "arrayField" : current.dataMode,
      arraySource: {
        enabled: false,
        field: "",
        rowIdentityField: "",
        ...(current.arraySource || {}),
        ...updates,
      },
    }));
  };

  const generateTableArraySource = () => {
    if (!selectedArrayTableField || !tableConfig.arraySource?.rowIdentityField)
      return;
    const rowIdentityField = tableConfig.arraySource.rowIdentityField;
    setTableConfig((current) => {
      const parentId = current.arraySource?.parentId || {
        source: "static" as const,
        value: "{{route.id}}",
      };
      const enabled = current.arraySource?.autoGenerate || {
        columns: true,
        add: true,
        edit: true,
        delete: true,
        reorder: false,
      };
      const generated = generateArrayTableDefaults({
        parentId,
        arrayField: selectedArrayTableField,
        rowIdentityField,
        enabled,
        orderField: current.drag?.orderField,
      });
      return reconcileArrayTableDefaults(
        { ...current, ...generated },
        selectedArrayTableField,
      ).table;
    });
  };

  const addTableNestedRowColumn = () => {
    setTableConfig((current) => {
      const nestedRows = {
        enabled: false,
        field: "",
        header: "",
        columns: [],
        ...(current.nestedRows || {}),
      };
      const columns = nestedRows.columns || [];
      return {
        ...current,
        nestedRows: {
          ...nestedRows,
          columns: [
            ...columns,
            { field: "", type: "field" as const, displayName: "" },
          ],
        },
      };
    });
  };

  const updateTableNestedRowColumn = (
    columnIndex: number,
    updates: Partial<
      NonNullable<NonNullable<TableComponentConfig["nestedRows"]>["columns"]>[number]
    >,
  ) => {
    setTableConfig((current) => {
      const nestedRows = {
        enabled: false,
        field: "",
        header: "",
        columns: [],
        ...(current.nestedRows || {}),
      };
      const columns = [...(nestedRows.columns || [])];
      columns[columnIndex] = { ...columns[columnIndex], ...updates };
      return {
        ...current,
        nestedRows: {
          ...nestedRows,
          columns,
        },
      };
    });
  };

  const removeTableNestedRowColumn = (columnIndex: number) => {
    setTableConfig((current) => {
      const nestedRows = {
        enabled: false,
        field: "",
        header: "",
        columns: [],
        ...(current.nestedRows || {}),
      };
      return {
        ...current,
        nestedRows: {
          ...nestedRows,
          columns: (nestedRows.columns || []).filter(
            (_, index) => index !== columnIndex,
          ),
        },
      };
    });
  };

  const updateTableColumnLink = (
    fieldName: string,
    updates: NonNullable<TableColumnConfig["link"]>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              link: { type: "external", ...column.link, ...updates },
            }
          : column,
      ),
    }));
  };

  const updateTableColumnRule = (
    fieldName: string,
    ruleIndex: number,
    updates: Partial<RowClassConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) => {
        if (column.field !== fieldName) return column;
        const rules = [...(column.cellClassName || [])];
        rules[ruleIndex] = { ...rules[ruleIndex], ...updates };
        return { ...column, cellClassName: rules };
      }),
    }));
  };

  const addTableColumnRule = (fieldName: string) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              cellClassName: [
                ...(column.cellClassName || []),
                { condition: "", className: "" },
              ],
            }
          : column,
      ),
    }));
  };

  const removeTableColumnRule = (fieldName: string, ruleIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              cellClassName: (column.cellClassName || []).filter(
                (_, index) => index !== ruleIndex,
              ),
            }
          : column,
      ),
    }));
  };

  const updateRowRule = (
    ruleIndex: number,
    updates: Partial<RowClassConfig>,
  ) => {
    setTableConfig((current) => {
      const rules = [...(current.rows?.className || [])];
      rules[ruleIndex] = { ...rules[ruleIndex], ...updates };
      return { ...current, rows: { className: rules } };
    });
  };

  const addRowRule = () => {
    setTableConfig((current) => ({
      ...current,
      rows: {
        className: [
          ...(current.rows?.className || []),
          { condition: "", className: "" },
        ],
      },
    }));
  };

  const removeRowRule = (ruleIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      rows: {
        className: (current.rows?.className || []).filter(
          (_, index) => index !== ruleIndex,
        ),
      },
    }));
  };

  const updateInfoBlockColorRule = (
    blockIndex: number,
    target: "titleColorRules" | "footerColorRules",
    ruleIndex: number,
    updates: Partial<InfoBlockColorRule>,
  ) => {
    setInfoBlockItems((current) =>
      current.map((block, itemIndex) => {
        if (itemIndex !== blockIndex) return block;
        const rules = [...(block[target] || [])];
        rules[ruleIndex] = { ...rules[ruleIndex], ...updates };
        return { ...block, [target]: rules };
      }),
    );
  };

  const addInfoBlockColorRule = (
    blockIndex: number,
    target: "titleColorRules" | "footerColorRules",
  ) => {
    setInfoBlockItems((current) =>
      current.map((block, itemIndex) =>
        itemIndex === blockIndex
          ? {
              ...block,
              [target]: [...(block[target] || []), createInfoBlockColorRule()],
            }
          : block,
      ),
    );
  };

  const removeInfoBlockColorRule = (
    blockIndex: number,
    target: "titleColorRules" | "footerColorRules",
    ruleIndex: number,
  ) => {
    setInfoBlockItems((current) =>
      current.map((block, itemIndex) =>
        itemIndex === blockIndex
          ? {
              ...block,
              [target]: (block[target] || []).filter(
                (_, index) => index !== ruleIndex,
              ),
            }
          : block,
      ),
    );
  };

  const updateDistributionBlockItem = (
    blockIndex: number,
    updates: Partial<DistributionBlockItemConfig>,
  ) => {
    setDistributionBlockItems((current) =>
      current.map((block, itemIndex) =>
        itemIndex === blockIndex ? { ...block, ...updates } : block,
      ),
    );
  };

  const normalizeTableActionOrders = (actions: TableActionConfig[]) =>
    actions.map((action, index) =>
      action.order === index + 1 ? action : { ...action, order: index + 1 },
    );

  const addTableAction = () => {
    const actionId = `action-${Date.now()}`;
    setActiveActionEditorId(`row-${actionId}`);
    setTableConfig((current) => {
      const currentActions = current.actions || [];
      return {
        ...current,
        actions: [
          ...currentActions,
          {
            id: actionId,
            key: actionId,
            kind: "update",
            label: "Action",
            buttonName: "",
            icon: "MdTouchApp",
            order: currentActions.length + 1,
            enabled: true,
            modalType: "none",
            fieldOverrides: [],
            constantValuesJson: "{}",
          },
        ],
      };
    });
  };

  const moveTableAction = (actionIndex: number, direction: -1 | 1) => {
    setTableConfig((current) => {
      const actions = current.actions || [];
      const targetIndex = actionIndex + direction;
      if (targetIndex < 0 || targetIndex >= actions.length) return current;
      return {
        ...current,
        actions: normalizeTableActionOrders(
          moveArrayItem(actions, actionIndex, direction),
        ),
      };
    });
  };

  const updateTableAction = (
    actionIndex: number,
    updates: Partial<TableActionConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) =>
        index === actionIndex ? { ...action, ...updates } : action,
      ),
    }));
  };

  const updateTableAddButton = (updates: Partial<TableActionConfig>) => {
    setTableConfig((current) => ({
      ...current,
      addButton: {
        ...(current.addButton || buildDefaultCreateAction(selectedFields)),
        ...updates,
      },
    }));
  };

  const updateTableBulkAction = (
    actionKey: "edit" | "delete",
    updates: Partial<TableActionConfig>,
  ) => {
    setTableConfig((current) => {
      const defaults = {
        edit:
          current.bulkActions?.edit || buildDefaultBulkEditAction(selectedFields),
        delete:
          current.bulkActions?.delete || buildDefaultBulkDeleteAction(),
      };
      return {
        ...current,
        bulkActions: {
          ...current.bulkActions,
          [actionKey]: {
            ...defaults[actionKey],
            ...updates,
          },
        },
      };
    });
  };

  const removeTableAction = (actionIndex: number) => {
    const action = tableConfig.actions?.[actionIndex];
    const collapseId = action?.id || action?.key || `action-index-${actionIndex}`;
    const remaining = (tableConfig.actions || []).filter((_, index) => index !== actionIndex);
    setActiveActionEditorId((current) => {
      if (current !== `row-${collapseId}`) return current;
      const nextIndex = Math.min(actionIndex, remaining.length - 1);
      const next = remaining[nextIndex];
      return next ? `row-${next.id || next.key || `action-index-${nextIndex}`}` : "add";
    });
    setTableConfig((current) => ({
      ...current,
      actions: normalizeTableActionOrders(
        (current.actions || []).filter(
          (_, index) => index !== actionIndex,
        ),
      ),
    }));
  };

  const addActionFieldOverride = (actionIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) =>
        index === actionIndex
          ? {
              ...action,
              fieldOverrides: [
                ...(action.fieldOverrides || []),
                { field: "", required: false, disabledCondition: "" },
              ],
            }
          : action,
      ),
    }));
  };

  const updateActionFieldOverride = (
    actionIndex: number,
    overrideIndex: number,
    updates: Partial<NonNullable<TableActionConfig["fieldOverrides"]>[number]>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) => {
        if (index !== actionIndex) return action;
        const overrides = [...(action.fieldOverrides || [])];
        overrides[overrideIndex] = {
          ...overrides[overrideIndex],
          ...updates,
        };
        return { ...action, fieldOverrides: overrides };
      }),
    }));
  };

  const removeActionFieldOverride = (
    actionIndex: number,
    overrideIndex: number,
  ) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) =>
        index === actionIndex
          ? {
              ...action,
              fieldOverrides: (action.fieldOverrides || []).filter(
                (_, currentIndex) => currentIndex !== overrideIndex,
              ),
            }
          : action,
      ),
    }));
  };

  const addActionFormField = (actionIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) =>
        index === actionIndex
          ? {
              ...action,
              modalType:
                action.modalType === "none" ? "form" : action.modalType,
              formFields: [
                ...(action.formFields || []),
                {
                  formKey: "",
                  type: "text",
                  formKeyType: "string",
                  label: "",
                  placeholder: "",
                  required: false,
                  isDisabled: false,
                  requiredCondition: "",
                  disabledCondition: "",
                  optionsSource: "static",
                  staticOptionsJson: "[]",
                  sourceSchemaName: "",
                  sourceValueField: "_id",
                  sourceLabelField: "",
                  sourceFilterCondition: "",
                },
              ],
            }
          : action,
      ),
    }));
  };

  const updateActionFormField = (
    actionIndex: number,
    fieldIndex: number,
    updates: Partial<TableActionFormFieldConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) => {
        if (index !== actionIndex) return action;
        const formFields = [...(action.formFields || [])];
        formFields[fieldIndex] = { ...formFields[fieldIndex], ...updates };
        return { ...action, formFields };
      }),
    }));
  };

  const removeActionFormField = (actionIndex: number, fieldIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) =>
        index === actionIndex
          ? {
              ...action,
              formFields: (action.formFields || []).filter(
                (_, currentIndex) => currentIndex !== fieldIndex,
              ),
            }
          : action,
      ),
    }));
  };

  const moveActionFormField = (
    actionIndex: number,
    fieldIndex: number,
    direction: -1 | 1,
  ) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) =>
        index === actionIndex
          ? {
              ...action,
              formFields: moveArrayItem(
                action.formFields || [],
                fieldIndex,
                direction,
              ),
            }
          : action,
      ),
    }));
  };

  const addAddButtonFormField = () => {
    setTableConfig((current) => {
      const addButton =
        current.addButton || buildDefaultCreateAction(selectedFields);
      return {
        ...current,
        addButton: {
          ...addButton,
          modalType: "form",
          formFields: [
            ...(addButton.formFields || []),
            {
              formKey: "",
              type: "text",
              formKeyType: "string",
              label: "",
              placeholder: "",
              required: false,
              isDisabled: false,
              requiredCondition: "",
              disabledCondition: "",
              optionsSource: "static",
              staticOptionsJson: "[]",
              sourceSchemaName: "",
              sourceValueField: "_id",
              sourceLabelField: "",
              sourceFilterCondition: "",
            },
          ],
        },
      };
    });
  };

  const updateAddButtonFormField = (
    fieldIndex: number,
    updates: Partial<TableActionFormFieldConfig>,
  ) => {
    setTableConfig((current) => {
      const addButton =
        current.addButton || buildDefaultCreateAction(selectedFields);
      const formFields = [...(addButton.formFields || [])];
      formFields[fieldIndex] = { ...formFields[fieldIndex], ...updates };
      return {
        ...current,
        addButton: { ...addButton, formFields },
      };
    });
  };

  const removeAddButtonFormField = (fieldIndex: number) => {
    setTableConfig((current) => {
      const addButton =
        current.addButton || buildDefaultCreateAction(selectedFields);
      return {
        ...current,
        addButton: {
          ...addButton,
          formFields: (addButton.formFields || []).filter(
            (_, currentIndex) => currentIndex !== fieldIndex,
          ),
        },
      };
    });
  };

  const moveAddButtonFormField = (fieldIndex: number, direction: -1 | 1) => {
    setTableConfig((current) => {
      const addButton =
        current.addButton || buildDefaultCreateAction(selectedFields);
      return {
        ...current,
        addButton: {
          ...addButton,
          formFields: moveArrayItem(
            addButton.formFields || [],
            fieldIndex,
            direction,
          ),
        },
      };
    });
  };

  const updateBulkEditFormField = (
    fieldIndex: number,
    updates: Partial<TableActionFormFieldConfig>,
  ) => {
    setTableConfig((current) => {
      const edit =
        current.bulkActions?.edit || buildDefaultBulkEditAction(selectedFields);
      const formFields = [...(edit.formFields || [])];
      formFields[fieldIndex] = { ...formFields[fieldIndex], ...updates };
      return {
        ...current,
        bulkActions: {
          ...current.bulkActions,
          edit: { ...edit, formFields },
        },
      };
    });
  };

  const addBulkEditFormField = () => {
    setTableConfig((current) => {
      const edit =
        current.bulkActions?.edit || buildDefaultBulkEditAction(selectedFields);
      return {
        ...current,
        bulkActions: {
          ...current.bulkActions,
          edit: {
            ...edit,
            modalType: "form",
            formFields: [
              ...(edit.formFields || []),
              {
                formKey: "",
                type: "text",
                formKeyType: "string",
                label: "",
                placeholder: "",
                required: false,
                isDisabled: false,
                requiredCondition: "",
                disabledCondition: "",
                optionsSource: "static",
                staticOptionsJson: "[]",
                sourceSchemaName: "",
                sourceValueField: "_id",
                sourceLabelField: "",
                sourceFilterCondition: "",
              },
            ],
          },
        },
      };
    });
  };

  const removeBulkEditFormField = (fieldIndex: number) => {
    setTableConfig((current) => {
      const edit =
        current.bulkActions?.edit || buildDefaultBulkEditAction(selectedFields);
      return {
        ...current,
        bulkActions: {
          ...current.bulkActions,
          edit: {
            ...edit,
            formFields: (edit.formFields || []).filter(
              (_, currentIndex) => currentIndex !== fieldIndex,
            ),
          },
        },
      };
    });
  };

  const moveBulkEditFormField = (fieldIndex: number, direction: -1 | 1) => {
    setTableConfig((current) => {
      const edit =
        current.bulkActions?.edit || buildDefaultBulkEditAction(selectedFields);
      return {
        ...current,
        bulkActions: {
          ...current.bulkActions,
          edit: {
            ...edit,
            formFields: moveArrayItem(
              edit.formFields || [],
              fieldIndex,
              direction,
            ),
          },
        },
      };
    });
  };

  const addFilterPanelInput = () => {
    setTableConfig((current) => ({
      ...current,
      filterPanel: {
        inputs: [
          ...(current.filterPanel?.inputs || []),
          {
            formKey: "",
            type: "text",
            formKeyType: "string",
            label: "",
            placeholder: "",
            required: false,
            isDisabled: false,
            requiredCondition: "",
            disabledCondition: "",
            optionsSource: "static",
            staticOptionsJson: "[]",
            sourceSchemaName: "",
            sourceValueField: "_id",
            sourceLabelField: "",
            sourceFilterCondition: "",
          },
        ],
      },
    }));
  };

  const buildDefaultFilterPanelInputsForCurrentSource =
    (): TableFilterPanelInputConfig[] => {
      if (tableSourceType === "pipeline") {
        const outputFields =
          pipelineOptions.find(({ pipeline }) => pipeline.name === pipelineName)
            ?.outputFields || [];
        return buildTableColumnsFromNames(outputFields).map((column) => ({
          formKey: column.field,
          type: "text",
          formKeyType: "string",
          label: column.displayName || column.field,
          placeholder: column.displayName || column.field,
          required: false,
          disabledCondition: "",
          requiredCondition: "",
          isDisabled: false,
          isMultiple: false,
          optionsSource: "static",
          staticOptionsJson: "[]",
          sourceValueField: "_id",
          sourceFilterCondition: "",
        }));
      }

      if (tableSourceType === "workflow") {
        const outputFields =
          workflowOptions.find(({ workflow }) => workflow.name === workflowName)
            ?.outputFields || [];
        return buildTableColumnsFromNames(outputFields).map((column) => ({
          formKey: column.field,
          type: "text",
          formKeyType: "string",
          label: column.displayName || column.field,
          placeholder: column.displayName || column.field,
          required: false,
          disabledCondition: "",
          requiredCondition: "",
          isDisabled: false,
          isMultiple: false,
          optionsSource: "static",
          staticOptionsJson: "[]",
          sourceValueField: "_id",
          sourceFilterCondition: "",
        }));
      }

      return buildFilterPanelInputsFromFields(selectedFields);
    };

  const areDefaultFilterPanelInputsActive = () => {
    const currentInputs = tableConfig.filterPanel?.inputs || [];
    const defaultInputs = buildDefaultFilterPanelInputsForCurrentSource();
    if (currentInputs.length !== defaultInputs.length) return false;

    const currentKeys = currentInputs.map((input) => input.formKey).sort();
    const defaultKeys = defaultInputs.map((input) => input.formKey).sort();
    return currentKeys.every((key, index) => key === defaultKeys[index]);
  };

  const setDefaultFilterPanelInputsActive = (isActive: boolean) => {
    setTableConfig((current) => ({
      ...current,
      filterPanel: {
        inputs: isActive ? buildDefaultFilterPanelInputsForCurrentSource() : [],
      },
    }));
  };

  const updateFilterPanelInput = (
    inputIndex: number,
    updates: Partial<TableFilterPanelInputConfig>,
  ) => {
    setTableConfig((current) => {
      const inputs = [...(current.filterPanel?.inputs || [])];
      inputs[inputIndex] = { ...inputs[inputIndex], ...updates };
      return {
        ...current,
        filterPanel: { inputs },
      };
    });
  };

  const removeFilterPanelInput = (inputIndex: number) => {
    const input = tableConfig.filterPanel?.inputs?.[inputIndex];
    if (
      input?.id &&
      runtimeOutputs.some(
        (output) =>
          output.source.kind === "tableFilter" &&
          output.source.filterId === input.id,
      )
    ) {
      alert(
        "This filter is exposed as a component output. Delete that output before deleting the filter.",
      );
      return;
    }
    setTableConfig((current) => ({
      ...current,
      filterPanel: {
        inputs: (current.filterPanel?.inputs || []).filter(
          (_, currentIndex) => currentIndex !== inputIndex,
        ),
      },
    }));
  };

  const addTab = () => {
    const newTabId = `tab-${Date.now()}`;
    setTabs([
      ...tabs,
      {
        id: newTabId,
        title: `Tab ${tabs.length + 1}`,
        components: [],
      },
    ]);
  };

  // Open Excel upload for tab
  const openTabExcelUpload = () => {
    setShowTabExcelModal(true);
  };

  // Handle Excel upload success for tabs
  const handleTabExcelUploadSuccess = (
    schemaName: string,
    component: ComponentBlock,
  ) => {
    const newTabId = `tab-${Date.now()}`;
    setTabs([
      ...tabs,
      {
        id: newTabId,
        title: schemaName,
        components: [component],
      },
    ]);
  };

  const removeTab = (tabIndex: number) => {
    setTabs(tabs.filter((_, i) => i !== tabIndex));
  };

  const removeTableFromTab = (tabIndex: number, componentId: string) => {
    setTabs((currentTabs) =>
      currentTabs.map((tab, index) =>
        index === tabIndex ? removeTabChild(tab, componentId) : tab,
      ),
    );
  };

  const tableBeingEdited =
    tableEditorTarget?.componentId !== undefined
      ? tabs[tableEditorTarget.tabIndex]?.components.find(
          (component) => component.id === tableEditorTarget.componentId,
        ) || null
      : null;

  const saveTableToTab = (component: ComponentBlock) => {
    if (!tableEditorTarget) return;

    setTabs((currentTabs) =>
      currentTabs.map((tab, tabIndex) => {
        if (tabIndex !== tableEditorTarget.tabIndex) return tab;

        return saveSingleTabChild(
          tab,
          component,
          tableEditorTarget.componentId,
        );
      }),
    );
    if (component.table) {
      setTableConfig(component.table);
    }
    setTableEditorTarget(null);
  };

  const showStandardComponentFields = ![
    "tabPanel", "infoBlocks", "distributionBlocks", "relationMatrix", "custom",
  ].includes(componentType);

  const currentAddButton = {
    ...(tableConfig.addButton || buildDefaultCreateAction(selectedFields)),
    kind: "create" as const,
  };
  const currentBulkEditAction = {
    ...(tableConfig.bulkActions?.edit ||
      buildDefaultBulkEditAction(selectedFields)),
    kind: "update" as const,
  };
  const currentBulkDeleteAction = {
    ...(tableConfig.bulkActions?.delete || buildDefaultBulkDeleteAction()),
    kind: "delete" as const,
  };

  return createPortal(
    <div
      data-modal-layer="110"
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Dismiss component editor"
        data-modal-backdrop-for={dialogId}
        disabled={isSaving}
        onClick={requestClose}
        className="absolute inset-0 cursor-default"
      />
      <div id={dialogId} ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-busy={isSaving} tabIndex={-1} className="relative bg-ui-surface rounded-2xl border border-ui-border shadow-ui-lg w-[min(96vw,1440px)] max-h-[94vh] overflow-hidden flex flex-col animate-scale-in">
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between px-6 py-4 border-b border-ui-border bg-ui-surface">
          <div>
            <h3 id={titleId} className="text-base font-semibold text-ui-foreground">
              {fixedComponentType === "table"
                ? editingComponent
                  ? "Edit Table"
                  : "Add Table"
                : editingComponent
                  ? "Edit Component"
                  : "Add Component"}
            </h3>
            <p className="text-xs text-ui-muted mt-0.5">
              Configure the component settings and data binding
            </p>
          </div>
          <button
            onClick={requestClose}
            disabled={isSaving}
            aria-label="Close component editor"
            className="inline-flex h-8 w-8 items-center justify-center rounded-ui-md text-ui-muted transition-colors hover:bg-ui-surface-subtle hover:text-ui-foreground active:scale-95"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div
          data-testid="component-modal-body"
          className="min-h-0 min-w-0 flex-1 overflow-y-auto px-6 py-5 bg-ui-surface-subtle/50"
        >
          <fieldset
            ref={(element) => element?.toggleAttribute("inert", isSaving)}
            disabled={isSaving}
            className="min-w-0 border-0 p-0 m-0"
          >
            <div className="space-y-5">
            {bindingIssues.some((issue) => !issue.parameter) && (
              <div className="space-y-1 rounded-lg border border-ui-danger/30 bg-ui-danger-subtle p-3">
                {bindingIssues
                  .filter((issue) => !issue.parameter)
                  .map((issue) => (
                    <div
                      key={`${issue.path}:${issue.code}`}
                      className="text-xs text-ui-danger"
                    >
                      {issue.message}
                    </div>
                  ))}
              </div>
            )}

            {componentType === "custom" && <VisualComponentPicker selection={visualSelection} onChange={setVisualSelection} />}
            {/* Component Type */}
            <EditorSectionTabs
              label="Component settings"
              tabbed={componentType === "table"}
              className="rounded-xl border border-ui-border bg-ui-surface p-5 shadow-ui-sm"
              contentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              sections={[
                {
                  value: "general",
                  label: "General",
                  content: (
                    <div>
                      <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-1.5 uppercase tracking-wide">
                        Component Type
                      </span>
                      <Select
                        aria-label="Component Type"
                        value={componentType}
                        onChange={(e) => setComponentType(e.target.value)}
                        disabled={Boolean(fixedComponentType)}
                        className="w-full"
                      >
                        <option value="table">Table</option>
                        <option value="relationMatrix">Relation Matrix</option>
                        <option value="form">Form</option>
                        <option value="custom">Visual component</option>
                        <option value="tabPanel">Tab Panel</option>
                        <option value="infoBlocks">Information Blocks</option>
                        <option value="distributionBlocks">
                          Distribution Blocks
                        </option>
                        {CHART_TYPES.map((chart) => (
                          <option key={chart.value} value={chart.value}>
                            {chart.label}
                          </option>
                        ))}
                      </Select></label>
                    </div>
                  ),
                },
                {
                  value: "general",
                  label: "General",
                  content: (
                    showStandardComponentFields && (
                      <div>
                        <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-1.5 uppercase tracking-wide">
                          Title
                        </span>
                        <Input
                          aria-label="Title"
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full"
                          placeholder="Optional component title"
                        /></label>
                      </div>
                    )
                  ),
                },
                {
                  value: "source",
                  label: "Data source",
                  content: (
                    showStandardComponentFields && (
                      <div>
                        <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-1.5 uppercase tracking-wide">
                          Schema Name
                          <span className="text-ui-danger ml-0.5">*</span>
                        </span>
                        <Select
                          aria-label="Schema Name"
                          value={schemaName}
                          onChange={(e) => {
                            setSchemaName(e.target.value);
                            if (componentType === "table") {
                              resetTableColumnsForSchema(e.target.value);
                            }
                            if (componentType === "form") {
                              const container = containers.find(
                                (item) => item.schemaName === e.target.value,
                              );
                              setFormConfig(
                                buildDefaultFormConfig(
                                  e.target.value,
                                  container?.fields || [],
                                ),
                              );
                            }
                          }}
                          className="w-full"
                        >
                          <option value="">Select a schema...</option>
                          {containerOptions.map((container) => (
                            <option key={container.value} value={container.value}>
                              {container.label}
                            </option>
                          ))}
                        </Select></label>
                      </div>
                    )
                  ),
                },
                {
                  value: "general",
                  label: "General",
                  content: (
                    showStandardComponentFields && (
                      <div>
                        <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-1.5 uppercase tracking-wide">
                          Runtime State Key
                        </span>
                        <Input
                          aria-label="Runtime State Key"
                          type="text"
                          value={stateKey}
                          onChange={(e) => {
                            setStateKeyTouched(true);
                            setStateKey(e.target.value);
                          }}
                          className="w-full"
                          placeholder="componentStateKey"
                        /></label>
                      </div>
                    )
                  ),
                },
                {
                  value: "source",
                  label: "Data source",
                  content: (
                    showStandardComponentFields && (
                      CHART_TYPES.some((c) => c.value === componentType) && (
                        <>
                          <div>
                            <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                              Chart Source
                            </span>
                            <Select
                              value={
                                tableSourceType === "schema"
                                  ? "pipeline"
                                  : tableSourceType
                              }
                              onChange={(e) => {
                                const nextSource = e.target.value as
                                  | "pipeline"
                                  | "workflow";
                                setTableSourceType(nextSource);
                                setPipelineName("");
                                setWorkflowName("");
                              }}
                              className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                            >
                              <option value="pipeline">Pipeline request</option>
                              <option value="workflow">Workflow request</option>
                            </Select></label>
                          </div>

                          {tableSourceType === "pipeline" && (
                            <div>
                              <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                                Pipeline Name
                                <span className="text-ui-danger ml-0.5">*</span>
                              </span>
                              <Select
                                value={pipelineName}
                                onChange={(e) => setPipelineName(e.target.value)}
                                className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                              >
                                <option value="">
                                  {pipelineOptions.length > 0
                                    ? "Select a pipeline..."
                                    : "No data-returning pipelines"}
                                </option>
                                {pipelineOptions.map(({ pipeline }) => (
                                  <option
                                    key={pipeline.name}
                                    value={pipeline.name}
                                  >
                                    {pipeline.name}
                                  </option>
                                ))}
                              </Select></label>
                            </div>
                          )}

                          {tableSourceType === "workflow" && (
                            <div>
                              <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                                Workflow Name
                                <span className="text-ui-danger ml-0.5">*</span>
                              </span>
                              <Select
                                value={workflowName}
                                onChange={(e) => setWorkflowName(e.target.value)}
                                className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                              >
                                <option value="">
                                  {workflowOptions.length > 0
                                    ? "Select a workflow..."
                                    : "No data-returning workflows"}
                                </option>
                                {workflowOptions.map(({ workflow }) => (
                                  <option
                                    key={workflow.name}
                                    value={workflow.name}
                                  >
                                    {workflow.name}
                                  </option>
                                ))}
                              </Select></label>
                            </div>
                          )}
                          {/* Dynamic Chart Options */}
                          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 bg-ui-surface-subtle/50 p-4 rounded-xl border border-ui-border mt-2">
                            <div className="md:col-span-2">
                              <span className="text-sm font-semibold text-ui-foreground">
                                Chart Options (Props)
                              </span>
                            </div>
                            <div>
                              <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                                Chart Height (px)
                              </span>
                              <Input
                                type="number"
                                value={Number(chartProps.height ?? 400)}
                                onChange={(e) =>
                                  handleChartPropChange(
                                    "height",
                                    Number(e.target.value),
                                  )
                                }
                                className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                                placeholder="400"
                                min={100}
                              /></label>
                            </div>
                            <div>
                              <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                                Color Scheme
                              </span>
                              <Select
                                value={
                                  (chartProps.colors as { scheme?: string } | undefined)
                                    ?.scheme || "nivo"
                                }
                                onChange={(e) =>
                                  handleChartPropChange("colors", {
                                    scheme: e.target.value,
                                  })
                                }
                                className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                              >
                                <option value="nivo">nivo (Default)</option>
                                <option value="category10">category10</option>
                                <option value="accent">accent</option>
                                <option value="dark2">dark2</option>
                                <option value="paired">paired</option>
                                <option value="pastel1">pastel1</option>
                                <option value="pastel2">pastel2</option>
                                <option value="set1">set1</option>
                                <option value="set2">set2</option>
                                <option value="set3">set3</option>
                              </Select></label>
                            </div>

                            {/* Specific fields depending on chart type */}
                            {(CHART_SPECIFIC_OPTIONS[componentType] || []).map(
                              (field) => (
                                <div
                                  key={field.name}
                                  className={
                                    field.type === "array" ? "md:col-span-2" : ""
                                  }
                                >
                                  <label className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                                    {field.label}
                                    {field.required && (
                                      <span className="text-ui-danger ml-0.5">
                                        *
                                      </span>
                                    )}
                                  </label>
                                  {field.type === "select" ? (
                                    <Select
                                      value={String(
                                        chartProps[field.name] ??
                                          field.defaultValue ??
                                          "",
                                      )}
                                      onChange={(e) =>
                                        handleChartPropChange(
                                          field.name,
                                          e.target.value,
                                        )
                                      }
                                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                                    >
                                      {(field.options || []).map((opt) => (
                                        <option key={opt} value={opt}>
                                          {opt}
                                        </option>
                                      ))}
                                    </Select>
                                  ) : field.type === "boolean" ? (
                                    <label className="inline-flex items-center mt-3 cursor-pointer">
                                      <Input
                                        type="checkbox"
                                        checked={Boolean(
                                          chartProps[field.name] ??
                                          field.defaultValue,
                                        )}
                                        onChange={(e) =>
                                          handleChartPropChange(
                                            field.name,
                                            e.target.checked,
                                          )
                                        }
                                        className="w-4 h-4 text-ui-primary border-ui-border rounded focus:ring-ui-focus"
                                      />
                                      <span className="ml-2 text-sm text-ui-foreground">
                                        {field.label}
                                      </span>
                                    </label>
                                  ) : (
                                    <Input
                                      type={
                                        field.type === "number"
                                          ? "number"
                                          : "text"
                                      }
                                      value={String(chartProps[field.name] ?? "")}
                                      onChange={(e) =>
                                        handleChartPropChange(
                                          field.name,
                                          field.type === "number"
                                            ? e.target.value === ""
                                              ? ""
                                              : Number(e.target.value)
                                            : e.target.value,
                                        )
                                      }
                                      placeholder={field.placeholder}
                                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                                    />
                                  )}
                                </div>
                              ),
                            )}

                            <div className="md:col-span-2">
                              <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-2 uppercase tracking-wide">
                                Custom Chart Options (JSON)
                              </span>
                              <Textarea
                                value={customChartOptions}
                                onChange={(e) =>
                                  setCustomChartOptions(e.target.value)
                                }
                                className="w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all placeholder:text-ui-placeholder"
                                placeholder='{"margin": {"top": 40, "right": 80, "bottom": 80, "left": 80}}'
                                rows={3}
                              /></label>
                            </div>
                          </div>
                        </>
                      )
                    )
                  ),
                },
                {
                  value: "source",
                  label: "Data source",
                  content: (
                    showStandardComponentFields && (
                      componentType === "table" && (
                        <>
                          <div>
                            <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-1.5 uppercase tracking-wide">
                              Table Source
                            </span>
                            <Select
                              aria-label="Table Source"
                              value={tableSourceType}
                              onChange={(e) => {
                                setTableSourceType(
                                  e.target.value as
                                  | "schema"
                                  | "pipeline"
                                  | "workflow",
                                );
                                setPipelineName("");
                                setWorkflowName("");
                                if (e.target.value === "schema") {
                                  resetTableColumnsForSchema(schemaName);
                                } else {
                                  setTableConfig((current) => ({
                                    ...current,
                                    columns: [],
                                    actions: [],
                                  }));
                                }
                              }}
                              className="w-full"
                            >
                              <option value="schema">Schema rows</option>
                              <option value="pipeline">Pipeline request</option>
                              <option value="workflow">Workflow request</option>
                            </Select></label>
                          </div>

                          {tableSourceType === "pipeline" && (
                            <div>
                              <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-1.5 uppercase tracking-wide">
                                Pipeline Name
                                <span className="text-ui-danger ml-0.5">*</span>
                              </span>
                              <Select
                                value={pipelineName}
                                onChange={(e) => setPipelineName(e.target.value)}
                                className="w-full"
                              >
                                <option value="">
                                  {pipelineOptions.length > 0
                                    ? "Select a pipeline..."
                                    : "No data-returning pipelines"}
                                </option>
                                {pipelineOptions.map(({ pipeline }) => (
                                  <option
                                    key={pipeline.name}
                                    value={pipeline.name}
                                  >
                                    {pipeline.name}
                                  </option>
                                ))}
                              </Select></label>
                              {pipelineName && (
                                <p className="mt-1 text-xs text-ui-muted">
                                  Output fields:{" "}
                                  {pipelineOptions
                                    .find(
                                      ({ pipeline }) =>
                                        pipeline.name === pipelineName,
                                    )
                                    ?.outputFields.join(", ")}
                                </p>
                              )}
                            </div>
                          )}

                          {tableSourceType === "workflow" && (
                            <div>
                              <label className="block"><span className="block text-xs font-semibold text-ui-muted mb-1.5 uppercase tracking-wide">
                                Workflow Name
                                <span className="text-ui-danger ml-0.5">*</span>
                              </span>
                              <Select
                                value={workflowName}
                                onChange={(e) => setWorkflowName(e.target.value)}
                                className="w-full"
                              >
                                <option value="">
                                  {workflowOptions.length > 0
                                    ? "Select a workflow..."
                                    : "No data-returning workflows"}
                                </option>
                                {workflowOptions.map(({ workflow }) => (
                                  <option
                                    key={workflow.name}
                                    value={workflow.name}
                                  >
                                    {workflow.name}
                                  </option>
                                ))}
                              </Select></label>
                              {workflowName && (
                                <p className="mt-1 text-xs text-ui-muted">
                                  Output fields:{" "}
                                  {workflowOptions
                                    .find(
                                      ({ workflow }) =>
                                        workflow.name === workflowName,
                                    )
                                    ?.outputFields.join(", ")}
                                </p>
                              )}
                            </div>
                          )}
                        </>
                      )
                    )
                  ),
                },
                {
                  value: "outputs",
                  label: "Outputs",
                  content: (
                    showStandardComponentFields && (
                      (componentType === "table" ||
                        componentType === "infoBlocks") && (
                        <ComponentOutputsEditor
                          page={page}
                          component={draftRuntimeComponent}
                          onChange={(component) =>
                            setRuntimeOutputs(
                              component.outputs as NonNullable<
                                ComponentBlock["outputs"]
                              >,
                            )
                          }
                          infoBlockItems={infoBlockItems}
                        />
                      )
                    )
                  ),
                },
              ]}
            />

            {componentType === "relationMatrix" && (
              <div className="space-y-5 rounded-2xl border border-ui-border bg-white p-5 shadow-sm">
                <div>
                  <h4 className="text-base font-semibold text-ui-foreground">
                    Relation Matrix
                  </h4>
                  <p className="mt-1 text-sm text-ui-muted">
                    Render one schema as rows and another as editable relation columns.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <label className="space-y-1">
                    <span className="text-xs font-semibold uppercase text-ui-muted">Title</span>
                    <Input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-lg border border-ui-border px-3 py-2 text-sm" placeholder="Optional component title" />
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs font-semibold uppercase text-ui-muted">Row schema</span>
                    <Select value={relationMatrixConfig.rowSchemaName} onChange={(event) => setRelationMatrixConfig((current) => ({ ...current, rowSchemaName: event.target.value, rowIdField: "_id", rowLabelField: "", filterPanel: undefined }))} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm">
                      <option value="">Select row schema</option>
                      {containerOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </Select>
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs font-semibold uppercase text-ui-muted">Row label field</span>
                    <Select value={relationMatrixConfig.rowLabelField} onChange={(event) => setRelationMatrixConfig((current) => ({ ...current, rowLabelField: event.target.value }))} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm">
                      <option value="">Select row label</option>
                      {(relationRowContainer?.fields || []).map((field) => <option key={field.name} value={field.name}>{field.frontend?.displayName || field.name}</option>)}
                    </Select>
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs font-semibold uppercase text-ui-muted">Column schema</span>
                    <Select value={relationMatrixConfig.columnSchemaName} onChange={(event) => setRelationMatrixConfig((current) => ({ ...current, columnSchemaName: event.target.value, columnIdField: "_id", columnLabelField: "", targetArrayField: "", targetItemMatchField: "" }))} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm">
                      <option value="">Select column schema</option>
                      {containerOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </Select>
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs font-semibold uppercase text-ui-muted">Column label field</span>
                    <Select value={relationMatrixConfig.columnLabelField} onChange={(event) => setRelationMatrixConfig((current) => ({ ...current, columnLabelField: event.target.value }))} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm">
                      <option value="">Select column label</option>
                      {(relationColumnContainer?.fields || []).map((field) => <option key={field.name} value={field.name}>{field.frontend?.displayName || field.name}</option>)}
                    </Select>
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs font-semibold uppercase text-ui-muted">Target array field</span>
                    <Select value={relationMatrixConfig.targetArrayField} onChange={(event) => setRelationMatrixConfig((current) => ({ ...current, targetArrayField: event.target.value, targetItemMatchField: "" }))} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm">
                      <option value="">Select embedded array</option>
                      {(relationColumnContainer?.fields || []).filter((field) => field.type?.toLowerCase() === "array" && field.children?.length).map((field) => <option key={field.name} value={field.name}>{field.frontend?.displayName || field.name}</option>)}
                    </Select>
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs font-semibold uppercase text-ui-muted">Membership field</span>
                    <Select value={relationMatrixConfig.targetItemMatchField} onChange={(event) => setRelationMatrixConfig((current) => ({ ...current, targetItemMatchField: event.target.value }))} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm">
                      <option value="">Select membership field</option>
                      {(relationTargetArray?.children || []).filter((field) => field.type?.toLowerCase() !== "array").map((field) => <option key={field.name} value={field.name}>{field.frontend?.displayName || field.name}</option>)}
                    </Select>
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs font-semibold uppercase text-ui-muted">Column limit</span>
                    <Input type="number" min={1} max={100} value={relationMatrixConfig.columnLimit || 100} onChange={(event) => setRelationMatrixConfig((current) => ({ ...current, columnLimit: Math.min(100, Math.max(1, Number(event.target.value) || 100)) }))} className="w-full rounded-lg border border-ui-border px-3 py-2 text-sm" />
                  </label>
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase text-ui-muted">Controls</span>
                    {(relationMatrixConfig.toggles || []).filter((toggle) => toggle.id !== "show-relations").map((toggle) => (
                      <label key={toggle.id} className="flex items-center gap-2 text-sm text-ui-foreground">
                        <Input type="checkbox" checked={toggle.defaultValue} onChange={(event) => setRelationMatrixConfig((current) => ({ ...current, toggles: (current.toggles || []).map((item) => item.id === toggle.id ? { ...item, defaultValue: event.target.checked } : item) }))} />
                        {toggle.label}
                      </label>
                    ))}
                  </div>
                </div>
                <RelationMatrixFilterEditor
                  value={relationMatrixConfig}
                  rowFields={relationRowContainer?.fields || []}
                  containers={containers}
                  onChange={setRelationMatrixConfig}
                />
              </div>
            )}

            {componentType === "form" && (
              <FormComponentEditor
                value={formConfig}
                schemaFields={availableFormFields}
                containers={containers}
                onChange={setFormConfig}
              />
            )}

            {componentType === "infoBlocks" && (
              <InfoBlocksEditor title={title} setTitle={setTitle} containerOptions={containerOptions} schemaName={schemaName} setSchemaName={setSchemaName} infoBlocksSource={infoBlocksSource} setInfoBlocksSource={setInfoBlocksSource} pipelineName={pipelineName} setPipelineName={setPipelineName} pipelineOptions={pipelineOptions} workflowName={workflowName} setWorkflowName={setWorkflowName} workflowOptions={workflowOptions} isDynamic={isDynamic} setIsDynamic={setIsDynamic} dynamicLimit={dynamicLimit} setDynamicLimit={setDynamicLimit} infoBlockItems={infoBlockItems} setInfoBlockItems={setInfoBlockItems} dynamicInfoBlockItem={dynamicInfoBlockItem} setDynamicInfoBlockItem={setDynamicInfoBlockItem} addInfoBlockColorRule={addInfoBlockColorRule} removeInfoBlockColorRule={removeInfoBlockColorRule} updateInfoBlockColorRule={updateInfoBlockColorRule} />
            )}

            {componentType === "distributionBlocks" && (
              <DistributionBlocksEditor title={title} setTitle={setTitle} containerOptions={containerOptions} schemaName={schemaName} setSchemaName={setSchemaName} distributionBlocksSource={distributionBlocksSource} setDistributionBlocksSource={setDistributionBlocksSource} pipelineName={pipelineName} setPipelineName={setPipelineName} pipelineOptions={pipelineOptions} workflowName={workflowName} setWorkflowName={setWorkflowName} workflowOptions={workflowOptions} isDynamic={isDynamic} setIsDynamic={setIsDynamic} dynamicLimit={dynamicLimit} setDynamicLimit={setDynamicLimit} distributionBlockItems={distributionBlockItems} setDistributionBlockItems={setDistributionBlockItems} dynamicDistributionBlockItem={dynamicDistributionBlockItem} setDynamicDistributionBlockItem={setDynamicDistributionBlockItem} updateDistributionBlockItem={updateDistributionBlockItem} />
            )}

            {(componentType !== "tabPanel" || componentType === "tabPanel") && (
              <>
                {/* Table Configuration */}
                {componentType === "table" && (
                  <div className="rounded-xl border border-ui-border bg-ui-surface shadow-ui-sm overflow-hidden">
                    <div className="flex items-center justify-between gap-4 border-b border-ui-border bg-ui-surface-subtle/60 px-5 py-3.5">
                      <div>
                        <h4 className="text-sm font-semibold text-ui-foreground">
                          Table Settings
                        </h4>
                        <p className="text-xs text-ui-muted mt-0.5">
                          Configure column labels, links, cell classes, filters,
                          actions, and rows for this table component.
                        </p>
                      </div>
                      {schemaName && (
                        <div className="shrink-0 rounded-ui-md border border-ui-border bg-ui-surface px-2.5 py-1 text-xs text-ui-muted shadow-ui-sm">
                          <span className="font-semibold text-ui-foreground">
                            {tableConfig.columns?.length || 0}
                          </span>{" "}
                          columns
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[210px_minmax(0,1fr)] min-h-[520px]">
                      <div className="space-y-0.5 border-b lg:border-b-0 lg:border-r border-ui-border bg-ui-surface-subtle/40 p-2.5 lg:sticky lg:top-0 lg:self-start">
                        {TABLE_SETTINGS_TABS.map((tab) => (
                          <button
                            key={tab.value}
                            type="button"
                            onClick={() => setActiveTableSettingsTab(tab.value)}
                            className={`w-full rounded-ui-md px-3 py-2 text-left text-xs font-medium transition-colors ${
                              activeTableSettingsTab === tab.value
                                ? "bg-ui-primary-soft text-ui-primary font-semibold border border-ui-primary/20 shadow-ui-sm"
                                : "text-ui-muted hover:bg-ui-surface hover:text-ui-foreground border border-transparent"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      <div className="min-w-0 bg-ui-surface p-5">
                        {!schemaName ? (
                          <div className="text-sm text-ui-muted border border-dashed border-ui-border rounded-lg p-4">
                            Select a schema to configure table settings.
                          </div>
                        ) : activeTableSettingsTab !== "display" &&
                          selectedFields.length === 0 &&
                          (tableConfig.columns || []).length === 0 ? (
                          <div className="text-sm text-ui-muted border border-dashed border-ui-border rounded-lg p-4">
                            Add output fields for this table source.
                          </div>
                        ) : (
                          <>
                            {activeTableSettingsTab === "display" && (
                              <div className="space-y-4">
                                <div className="flex items-start justify-between gap-3 rounded-xl border border-ui-border bg-ui-surface-subtle/50 p-4">
                                  <div>
                                    <span className="block text-xs font-semibold text-ui-foreground uppercase tracking-wide">
                                      Table Search
                                    </span>
                                    <p className="mt-1 text-xs text-ui-muted">
                                      Show a search input above this table.
                                    </p>
                                  </div>
                                  <label className="flex items-center gap-2 rounded-ui-md border border-ui-border bg-ui-surface px-3 py-2 text-xs font-medium text-ui-foreground">
                                    <Input
                                      type="checkbox"
                                      checked={tableConfig.enableSearch !== false}
                                      onChange={(e) =>
                                        setTableConfig((current) => ({
                                          ...current,
                                          enableSearch: e.target.checked
                                            ? undefined
                                            : false,
                                        }))
                                      }
                                    />
                                    Enabled
                                  </label>
                                </div>
                                <div className="space-y-3 rounded-xl border border-ui-border p-4">
                                  <h4 className="text-sm font-semibold text-ui-foreground">Table labels</h4>
                                  <label className="block text-sm text-ui-foreground">
                                    Actions column heading
                                    <Input className="mt-1 w-full" value={tableConfig.actionsColumnLabel || ""} placeholder="Actions" onChange={(event) => setTableConfig((current) => ({ ...current, actionsColumnLabel: event.target.value }))} />
                                  </label>
                                  <label className="block text-sm text-ui-foreground">
                                    Search placeholder
                                    <Input className="mt-1 w-full" value={tableConfig.searchPlaceholder || ""} placeholder="Search" onChange={(event) => setTableConfig((current) => ({ ...current, searchPlaceholder: event.target.value }))} />
                                  </label>
                                  <p className="text-xs text-ui-muted">Leave empty to use the default translated text.</p>
                                </div>
                              </div>
                            )}

                            {activeTableSettingsTab === "request" && (
                              <TableRequestTab selectedFields={selectedFields} tableSourceType={tableSourceType} tableConfig={tableConfig} setTableConfig={setTableConfig} addTableConstantFilter={addTableConstantFilter} removeTableConstantFilter={removeTableConstantFilter} updateTableConstantFilter={updateTableConstantFilter} updateTableConstantSort={updateTableConstantSort} />
                            )}

                            {activeTableSettingsTab === "columns" && (
                              <TableColumnsTab containerOptions={containerOptions} tableConfig={tableConfig} buildDefaultLookup={buildDefaultLookup} getLookupFieldOptions={getLookupFieldOptions} addTableColumn={addTableColumn} removeTableColumn={removeTableColumn} updateTableColumn={updateTableColumn} addTableComputedLabelRule={addTableComputedLabelRule} removeTableComputedLabelRule={removeTableComputedLabelRule} updateTableComputedLabelRule={updateTableComputedLabelRule} addTableProgressBarColorRule={addTableProgressBarColorRule} removeTableProgressBarColorRule={removeTableProgressBarColorRule} updateTableProgressBar={updateTableProgressBar} updateTableProgressBarColorRule={updateTableProgressBarColorRule} />
                            )}

                            {activeTableSettingsTab === "links" && (
                              <div className="space-y-3">
                                {(tableConfig.columns || []).map(
                                  (column, columnIndex) => (
                                    <div
                                      key={`column-${columnIndex}`}
                                      className="border border-ui-border rounded-xl p-4 space-y-3"
                                    >
                                      <div className="text-xs font-semibold text-ui-foreground">
                                        {column.displayName || column.field}
                                      </div>
                                      <div className="grid grid-cols-3 gap-3">
                                        <div>
                                          <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                            Link Type
                                          </span>
                                          <Select
                                            value={
                                              column.link?.type || "external"
                                            }
                                            onChange={(e) =>
                                              updateTableColumnLink(
                                                column.field,
                                                {
                                                  type: e.target
                                                    .value as LinkType,
                                                  template:
                                                    column.link?.template ||
                                                    defaultTemplateForDesignerLinkType(
                                                      e.target
                                                        .value as LinkType,
                                                    ),
                                                },
                                              )
                                            }
                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus bg-white"
                                          >
                                            {LINK_TYPES.map((linkType) => (
                                              <option
                                                key={linkType.value}
                                                value={linkType.value}
                                              >
                                                {linkType.label}
                                              </option>
                                            ))}
                                          </Select></label>
                                        </div>
                                        <div className="col-span-2">
                                          <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                            Link Template
                                          </span>
                                          <Input
                                            type="text"
                                            value={column.link?.template || ""}
                                            onChange={(e) =>
                                              updateTableColumnLink(
                                                column.field,
                                                {
                                                  template: e.target.value,
                                                },
                                              )
                                            }
                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                            placeholder="https://example.com/{{value}}"
                                          /></label>
                                        </div>
                                        <div className="col-span-3">
                                          <label className="block"><span className="block text-[11px] font-medium text-ui-muted mb-1">
                                            Link Label Field
                                          </span>
                                          <Input
                                            type="text"
                                            value={
                                              column.link?.labelField || ""
                                            }
                                            onChange={(e) =>
                                              updateTableColumnLink(
                                                column.field,
                                                {
                                                  labelField: e.target.value,
                                                },
                                              )
                                            }
                                            className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                            placeholder="Optional field name for link text"
                                          /></label>
                                        </div>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}

                            {activeTableSettingsTab === "cellClasses" && (
                              <div className="space-y-3">
                                {(tableConfig.columns || []).map(
                                  (column, columnIndex) => (
                                    <div
                                      key={`column-${columnIndex}`}
                                      className="border border-ui-border rounded-xl p-4 space-y-3"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="text-xs font-semibold text-ui-foreground">
                                          {column.displayName || column.field}
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            addTableColumnRule(column.field)
                                          }
                                          className="text-xs font-medium text-ui-foreground hover:text-ui-foreground"
                                        >
                                          + Add rule
                                        </button>
                                      </div>
                                      {(column.cellClassName || []).map(
                                        (rule, ruleIndex) => (
                                          <div
                                            key={ruleIndex}
                                            className="grid grid-cols-[1fr_1fr_auto] gap-2"
                                          >
                                            <Input
                                              type="text"
                                              value={rule.condition}
                                              onChange={(e) =>
                                                updateTableColumnRule(
                                                  column.field,
                                                  ruleIndex,
                                                  { condition: e.target.value },
                                                )
                                              }
                                              className="px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                              placeholder="status = 'active'"
                                            />
                                            <div>
                                              <Input
                                                type="text"
                                                value={rule.className}
                                                onChange={(e) =>
                                                  updateTableColumnRule(
                                                    column.field,
                                                    ruleIndex,
                                                    {
                                                      className: e.target.value,
                                                    },
                                                  )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus"
                                                placeholder="bg-green-50"
                                              />
                                              <p className="mt-1 text-[11px] text-ui-muted">
                                                Row class: {"{{colorClass}}"} · Raw
                                                color: bg-[{"{{backgroundColor}}"}]
                                              </p>
                                            </div>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                removeTableColumnRule(
                                                  column.field,
                                                  ruleIndex,
                                                )
                                              }
                                              className="px-2 text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded-lg"
                                            >
                                              <FiTrash2 size={14} />
                                            </button>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  ),
                                )}
                              </div>
                            )}

                            {activeTableSettingsTab === "rows" && (
                              <TableRowsTab
                                tableConfig={tableConfig}
                                addRowRule={addRowRule}
                                updateRowRule={updateRowRule}
                                removeRowRule={removeRowRule}
                              />
                            )}

                            {activeTableSettingsTab === "nestedRows" && (
                              <TableNestedRowsTab containerOptions={containerOptions} selectedFields={selectedFields} tableConfig={tableConfig} arrayTableFields={arrayTableFields} arrayTableIdentityFields={arrayTableIdentityFields} selectedArrayTableField={selectedArrayTableField} buildDefaultLookup={buildDefaultLookup} getLookupFieldOptions={getLookupFieldOptions} addTableNestedRowColumn={addTableNestedRowColumn} removeTableNestedRowColumn={removeTableNestedRowColumn} updateTableNestedRowColumn={updateTableNestedRowColumn} updateTableNestedRows={updateTableNestedRows} generateTableArraySource={generateTableArraySource} updateTableArraySource={updateTableArraySource} />
                            )}

                            {activeTableSettingsTab === "relations" && (
                              <TableRelationsTab
                                tableConfig={tableConfig}
                                selectedFields={selectedFields}
                                containerOptions={containerOptions}
                                getLookupFieldOptions={getLookupFieldOptions}
                                addGeneratedRelationColumns={addGeneratedRelationColumns}
                                updateGeneratedRelationColumns={updateGeneratedRelationColumns}
                                moveGeneratedRelationColumns={moveGeneratedRelationColumns}
                                removeGeneratedRelationColumns={removeGeneratedRelationColumns}
                              />
                            )}

                            {activeTableSettingsTab === "toggles" && (
                              <TableTogglesTab tableConfig={tableConfig} addTableToggle={addTableToggle} moveTableToggle={moveTableToggle} parseToggleRequestValue={parseToggleRequestValue} removeTableToggle={removeTableToggle} updateTableToggle={updateTableToggle} updateTableToggleRequestEffect={updateTableToggleRequestEffect} updateTableToggleVisibilityTarget={updateTableToggleVisibilityTarget} />
                            )}

                            {activeTableSettingsTab === "filterInputs" && (
                              <TableFilterInputsTab containers={containers} tableConfig={tableConfig} addFilterPanelInput={addFilterPanelInput} removeFilterPanelInput={removeFilterPanelInput} updateFilterPanelInput={updateFilterPanelInput} areDefaultFilterPanelInputsActive={areDefaultFilterPanelInputsActive} setDefaultFilterPanelInputsActive={setDefaultFilterPanelInputsActive} />
                            )}

                            {activeTableSettingsTab === "actions" && (
              <TableActionsTab containers={containers} selectedFields={selectedFields} tableConfig={tableConfig} currentAddButton={currentAddButton} projectWorkflowOptions={projectWorkflowOptions} tableActionSettingsId={tableActionSettingsId} activeActionEditorId={activeActionEditorId} setActiveActionEditorId={setActiveActionEditorId} activeAddButtonFieldIndex={activeAddButtonFieldIndex} setActiveAddButtonFieldIndex={setActiveAddButtonFieldIndex} activeActionFieldIndexes={activeActionFieldIndexes} setActiveActionFieldIndexes={setActiveActionFieldIndexes} addTableAction={addTableAction} moveTableAction={moveTableAction} removeTableAction={removeTableAction} updateTableAction={updateTableAction} updateTableAddButton={updateTableAddButton} addAddButtonFormField={addAddButtonFormField} removeAddButtonFormField={removeAddButtonFormField} moveAddButtonFormField={moveAddButtonFormField} updateAddButtonFormField={updateAddButtonFormField} addActionFormField={addActionFormField} removeActionFormField={removeActionFormField} moveActionFormField={moveActionFormField} updateActionFormField={updateActionFormField} addActionFieldOverride={addActionFieldOverride} removeActionFieldOverride={removeActionFieldOverride} updateActionFieldOverride={updateActionFieldOverride} />
                              )}

                            {activeTableSettingsTab === "bulkActions" && (
                              <TableBulkActionsTab
                                containers={containers}
                                selectedFields={selectedFields}
                                schemaName={schemaName}
                                projectWorkflowOptions={projectWorkflowOptions}
                                tableActionSettingsId={tableActionSettingsId}
                                activeBulkActionEditorId={activeBulkActionEditorId}
                                setActiveBulkActionEditorId={setActiveBulkActionEditorId}
                                activeBulkEditFieldIndex={activeBulkEditFieldIndex}
                                setActiveBulkEditFieldIndex={setActiveBulkEditFieldIndex}
                                currentBulkEditAction={currentBulkEditAction}
                                currentBulkDeleteAction={currentBulkDeleteAction}
                                updateTableBulkAction={updateTableBulkAction}
                                addBulkEditFormField={addBulkEditFormField}
                                updateBulkEditFormField={updateBulkEditFormField}
                                moveBulkEditFormField={moveBulkEditFormField}
                                removeBulkEditFormField={removeBulkEditFormField}
                              />
                            )}

                            </>
                          )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Pipeline / Workflow Params */}
                {(CHART_TYPES.some((c) => c.value === componentType) ||
                  (componentType === "table" && tableSourceType !== "schema") ||
                  (componentType === "infoBlocks" &&
                    infoBlocksSource !== "static") ||
                  (componentType === "distributionBlocks" &&
                    distributionBlocksSource !== "static")) && (
                  <div className="space-y-4 rounded-xl border border-ui-border bg-ui-surface-subtle/50 p-4">
                    <div className="flex items-center justify-between border-b border-ui-border pb-2 mb-2">
                      <span className="text-sm font-semibold text-ui-foreground">
                        Source Parameters
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowAdvancedJson(!showAdvancedJson)}
                        className="text-xs text-ui-primary hover:text-ui-foreground font-medium hover:underline"
                      >
                        {showAdvancedJson ? "Hide Raw JSON" : "Edit Raw JSON"}
                      </button>
                    </div>

                    <ParameterBindingsEditor
                      page={page}
                      componentId={
                        editingComponent?.id || draftRuntimeComponent.id
                      }
                      value={structuredParameters}
                      detectedParameterNames={Object.keys(paramsMap)}
                      issues={bindingIssues}
                      onChange={setStructuredParameters}
                    />

                    {/* Compatibility static parameter inputs */}
                    <div className="space-y-3 rounded-lg border border-ui-warning/25 bg-ui-warning-subtle/40 p-3">
                      <div className="text-xs font-semibold uppercase tracking-wide text-ui-warning">
                        Compatibility: legacy static params
                      </div>
                      {Object.keys(paramsMap).length === 0 ? (
                        <div className="text-xs text-ui-muted italic py-1">
                          No parameters configured. Select a pipeline or
                          workflow above to automatically scan for parameters.
                        </div>
                      ) : (
                        Object.entries(paramsMap).map(([key, val]) => {
                          const isDetected = (() => {
                            const detected: string[] = [];
                            if (selectedPipeline) {
                              detected.push(
                                ...extractPipelineParams(selectedPipeline),
                              );
                            } else if (selectedWorkflow) {
                              detected.push(
                                ...extractWorkflowParams(selectedWorkflow),
                              );
                            }
                            return detected.includes(key);
                          })();

                          return (
                            <div
                              key={key}
                              className="flex items-center gap-3 bg-white p-2 rounded-lg border border-ui-border shadow-sm"
                            >
                              <div className="w-1/3 flex items-center gap-1.5 min-w-0">
                                <span
                                  className="text-xs font-mono font-bold text-ui-foreground truncate"
                                  title={key}
                                >
                                  {key}
                                </span>
                                {isDetected && (
                                  <span className="px-1.5 py-0.5 text-[9px] font-medium bg-ui-active-subtle text-ui-primary border border-ui-border rounded">
                                    Auto
                                  </span>
                                )}
                              </div>
                              <div className="flex-1">
                                <Input
                                  type="text"
                                  value={val}
                                  onChange={(e) =>
                                    handleParamChange(key, e.target.value)
                                  }
                                  placeholder="Value or {{ route.paramName }}"
                                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-ui-border rounded-md focus:outline-none focus:ring-1 focus:ring-ui-focus focus:border-transparent"
                                />
                              </div>
                              {!isDetected && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveParam(key)}
                                  className="p-1 text-ui-placeholder hover:text-ui-danger rounded transition-all"
                                >
                                  <FiTrash2 size={14} />
                                </button>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Add Custom parameter */}
                    <div className="flex items-center gap-2 pt-2 border-t border-ui-border">
                      <Input
                        type="text"
                        value={customParamKey}
                        onChange={(e) => setCustomParamKey(e.target.value)}
                        placeholder="Custom param name..."
                        className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-ui-border rounded-md focus:outline-none focus:ring-1 focus:ring-ui-focus focus:border-transparent"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCustomParam();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomParam}
                        className="px-3 py-1.5 bg-ui-surface-subtle hover:border-ui-border-strong active:scale-95 text-ui-foreground text-xs font-medium rounded-md transition-all"
                      >
                        Add Custom
                      </button>
                    </div>

                    {/* Raw JSON textarea (Advanced) */}
                    {showAdvancedJson && (
                      <div className="space-y-1.5 pt-2 border-t border-ui-border">
                        <label className="block"><span className="block text-xs font-semibold text-ui-muted uppercase tracking-wide">
                          Raw Source Parameters (JSON)
                        </span>
                        <Textarea
                          value={params}
                          onChange={(e) => handleRawJsonChange(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent transition-all"
                          placeholder='{"key": "value"}'
                          rows={4}
                        /></label>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Tab Panel Configuration */}
            {componentType === "tabPanel" && (
              <TabPanelEditor schemas={schemas} setSchemaName={setSchemaName} tabs={tabs} setTabs={setTabs} groupBy={groupBy} setGroupBy={setGroupBy} groupByTemplateSchemaName={groupByTemplateSchemaName} groupByGroupedFields={groupByGroupedFields} groupByValueFields={groupByValueFields} groupByLabelFields={groupByLabelFields} addTab={addTab} removeTab={removeTab} removeTableFromTab={removeTableFromTab} openTabExcelUpload={openTabExcelUpload} resetTableColumnsForSchema={resetTableColumnsForSchema} setTableEditorTarget={setTableEditorTarget} />
            )}
            </div>
          </fieldset>
        </div>

        {saveError && <p role="alert" className="shrink-0 border-t border-ui-danger/20 bg-ui-danger-subtle px-6 py-3 text-sm text-ui-danger">{saveError}</p>}
        {/* Modal Footer */}
        <div className="flex shrink-0 items-center justify-end gap-3 px-6 py-4 border-t border-ui-border bg-ui-surface">
          <button
            onClick={requestClose}
            disabled={isSaving}
            className="inline-flex h-10 items-center px-4 text-sm font-medium text-ui-foreground bg-ui-surface border border-ui-border rounded-ui-md hover:bg-ui-surface-subtle hover:border-ui-border-hover active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => { void handleAdd(); }}
            disabled={
              isSaving ||
              (componentType === "custom" && !visualSelection) ||
              (requiresComponentSchemaName(componentType) && !schemaName) ||
              (componentType === "table" &&
                tableSourceType === "pipeline" &&
                !pipelineName) ||
              (componentType === "table" &&
                tableSourceType === "workflow" &&
                !workflowName) ||
              (componentType === "table" &&
                tableConfig.dataMode === "arrayField" &&
                !cleanArrayTableSource(tableConfig.arraySource)) ||
              (componentType === "relationMatrix" &&
                !isRelationMatrixConfigComplete(relationMatrixConfig)) ||
              (componentType === "infoBlocks" &&
                infoBlocksSource !== "static" &&
                !schemaName) ||
              (componentType === "infoBlocks" &&
                infoBlocksSource === "pipeline" &&
                !pipelineName) ||
              (componentType === "infoBlocks" &&
                infoBlocksSource === "workflow" &&
                !workflowName) ||
              (componentType === "distributionBlocks" &&
                distributionBlocksSource !== "static" &&
                !schemaName) ||
              (componentType === "distributionBlocks" &&
                distributionBlocksSource === "pipeline" &&
                !pipelineName) ||
              (componentType === "distributionBlocks" &&
                distributionBlocksSource === "workflow" &&
                !workflowName) ||
              (CHART_TYPES.some((c) => c.value === componentType) &&
                tableSourceType === "pipeline" &&
                !pipelineName) ||
              (CHART_TYPES.some((c) => c.value === componentType) &&
                tableSourceType === "workflow" &&
                !workflowName) ||
              (componentType === "form" &&
                formConfig.submit?.mode === "createMany" &&
                !formConfig.submit.bulkObjectListKey) ||
              (componentType === "form" &&
                formConfig.submit?.mode === "workflow" &&
                (!formConfig.submit.workflowSchema ||
                  !formConfig.submit.workflowName)) ||
              isChartConfigInvalid()
            }
            className="inline-flex h-10 items-center gap-2 px-5 text-sm font-semibold text-white bg-ui-primary rounded-ui-md hover:bg-ui-primary-hover active:scale-[0.98] transition-all shadow-ui-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving…" : editingComponent ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <FiPlus size={16} strokeWidth={2.5} />
                <span>
                  {fixedComponentType === "table"
                    ? "Add Table"
                    : "Add Component"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {tableEditorTarget && (
        <ComponentModal
          schemas={schemas}
          containerOptions={containerOptions}
          containers={containers}
          page={page}
          currentCellId={currentCellId}
          editingComponent={tableBeingEdited}
          fixedComponentType={
            tableBeingEdited?.type || tableEditorTarget.componentType || "table"
          }
          onClose={() => setTableEditorTarget(null)}
          onAdd={saveTableToTab}
        />
      )}

      {/* Excel Upload Modal for Tabs */}
      <CellExcelUploadModal
        isOpen={showTabExcelModal}
        onClose={() => setShowTabExcelModal(false)}
        onSuccess={handleTabExcelUploadSuccess}
        mode="tab"
      />
    </div>,
    document.body,
  );
};

