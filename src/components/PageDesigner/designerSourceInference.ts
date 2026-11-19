import type { ContainerModel, DynamicWorkflow, Field, PipelineStage, WorkflowStep } from "../../utils/api/container";

export const normalizeOutputFields = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item, index, all) => item && all.indexOf(item) === index);
};

type LooseRecord = Record<string, unknown>;

/** Backend payloads sometimes carry legacy/alias keys that are not on the typed models. */
const loose = (value: object): LooseRecord => value as LooseRecord;

const firstString = (...values: unknown[]): string =>
  values.find((value): value is string => typeof value === "string" && value !== "") ?? "";

export const pipelineJson = (pipeline: PipelineStage): string =>
  firstString(loose(pipeline).pipelineJson, loose(pipeline).PipelineJSON);

export const inferFieldsFromProjectStage = (stage: LooseRecord): string[] => {
  const project = stage.$project || stage.project;
  if (!project || typeof project !== "object" || Array.isArray(project)) {
    return [];
  }

  return Object.entries(project)
    .filter(([field, value]) => {
      if (field === "_id") return false;
      if (value === 0 || value === false) return false;
      return true;
    })
    .map(([field]) => field);
};

export const inferFieldsFromPipelineStage = (stage: LooseRecord): string[] => {
  const projected = inferFieldsFromProjectStage(stage);
  if (projected.length > 0) return projected;

  if (typeof stage.$count === "string" && stage.$count.trim()) {
    return [stage.$count.trim()];
  }

  const group = stage.$group || stage.group;
  if (group && typeof group === "object" && !Array.isArray(group)) {
    return Object.keys(group).filter((field) => field !== "_id");
  }

  return [];
};

export const inferPipelineOutputFields = (
  pipeline: PipelineStage,
  fallbackFields: Field[],
): string[] => {
  const explicit = normalizeOutputFields(loose(pipeline).outputFields);
  if (explicit.length > 0) return explicit;

  try {
    const parsed = JSON.parse(pipelineJson(pipeline));
    if (Array.isArray(parsed)) {
      const lastStage = parsed[parsed.length - 1];
      if (lastStage?.$out || lastStage?.$merge) {
        return [];
      }
      for (let index = parsed.length - 1; index >= 0; index -= 1) {
        const stage = parsed[index];
        if (stage && typeof stage === "object" && !Array.isArray(stage)) {
          const projected = inferFieldsFromPipelineStage(stage);
          if (projected.length > 0) return projected;
        }
      }
    }
  } catch {
    return [];
  }

  return fallbackFields.map((field) => field.name).filter(Boolean);
};

export const extractPipelineParams = (pipeline: PipelineStage | null): string[] => {
  if (!pipeline) return [];
  const jsonStr = firstString(pipeline.pipelineJson, loose(pipeline).pipelineJSON);
  if (!jsonStr) return [];

  const paramsSet = new Set<string>();

  // 1. Match {{paramName}}
  const rePlaceholders = /\{\{\s*([A-Za-z0-9_-]+)\s*\}\}/g;
  let match;
  while ((match = rePlaceholders.exec(jsonStr)) !== null) {
    const p = match[1];
    if (
      !["tenantID", "projectID"].includes(p) &&
      !p.startsWith("projectCollection:") &&
      !p.startsWith("collection:")
    ) {
      paramsSet.add(p);
    }
  }

  // 2. Match {"$param": "paramName"}
  const reDollarParam = /\{\s*"\$param"\s*:\s*"([A-Za-z0-9_-]+)"\s*\}/g;
  while ((match = reDollarParam.exec(jsonStr)) !== null) {
    paramsSet.add(match[1]);
  }

  return Array.from(paramsSet);
};

export const extractWorkflowParams = (workflow: DynamicWorkflow | null): string[] => {
  if (!workflow) return [];
  try {
    const jsonStr = JSON.stringify(workflow);
    const paramsSet = new Set<string>();

    // Match {{placeholder}}
    const rePlaceholders = /\{\{\s*([A-Za-z0-9_-]+)\s*\}\}/g;
    let match;
    while ((match = rePlaceholders.exec(jsonStr)) !== null) {
      const p = match[1];
      if (
        !["tenantID", "projectID"].includes(p) &&
        !p.startsWith("projectCollection:") &&
        !p.startsWith("collection:")
      ) {
        paramsSet.add(p);
      }
    }
    return Array.from(paramsSet);
  } catch {
    return [];
  }
};

export const flattenWorkflowSteps = (steps: WorkflowStep[] = []): WorkflowStep[] =>
  steps.flatMap((step) => [
    step,
    ...flattenWorkflowSteps(step.steps || []),
    ...flattenWorkflowSteps(step.elseSteps || []),
    ...(step.branches || []).flatMap((branch) =>
      flattenWorkflowSteps(branch.steps || []),
    ),
  ]);

export const workflowStepId = (step: WorkflowStep): string =>
  firstString(step.name, loose(step).id);

export const configOutputFields = (
  config: LooseRecord | undefined,
): string[] =>
  normalizeOutputFields(
    config?.outputFields || config?.returnFields || config?.fields,
  );

export const schemaFieldNames = (
  containers: ContainerModel[],
  schemaName: string | undefined,
): string[] =>
  (
    containers.find((container) => container.schemaName === schemaName)
      ?.fields || []
  )
    .map((field) => field.name)
    .filter(Boolean);

export const inferWorkflowStepFields = (
  step: WorkflowStep | undefined,
  containers: ContainerModel[],
  fallbackSchemaName: string,
): string[] => {
  if (!step) return [];
  const explicit = configOutputFields(step.config);
  if (explicit.length > 0) return explicit;

  if (step.config?.projection && typeof step.config.projection === "object") {
    const projected = inferFieldsFromProjectStage({
      $project: step.config.projection,
    });
    if (projected.length > 0) return projected;
  }

  if (Array.isArray(step.config?.pipeline)) {
    for (let index = step.config.pipeline.length - 1; index >= 0; index -= 1) {
      const projected = inferFieldsFromPipelineStage(
        step.config.pipeline[index],
      );
      if (projected.length > 0) return projected;
    }
  }

  if (
    typeof step.config?.value === "object" &&
    step.config.value !== null &&
    !Array.isArray(step.config.value)
  ) {
    const keys = Object.keys(step.config.value).filter((key) => key !== "_id");
    if (keys.length > 0) return keys;
  }

  if (["find_records", "get_record"].includes(step.type)) {
    return schemaFieldNames(
      containers,
      step.targetSchema || fallbackSchemaName,
    );
  }

  return [];
};

export const inferWorkflowOutputFields = (
  workflow: DynamicWorkflow,
  containers: ContainerModel[],
  fallbackSchemaName: string,
): string[] => {
  const explicit = normalizeOutputFields(
    loose(workflow).outputFields || loose(workflow).returnFields,
  );
  if (explicit.length > 0) return explicit;

  const steps = flattenWorkflowSteps(workflow.steps || []);
  const returnStep = steps.find(
    (step) => step.type === "return" && step.isActive !== false,
  );
  if (returnStep) {
    const fromReturn = inferWorkflowStepFields(
      returnStep,
      containers,
      fallbackSchemaName,
    );
    if (fromReturn.length > 0) return fromReturn;

    const value = returnStep.config?.value;
    if (typeof value === "string") {
      const match = value.match(/^\{\{\s*([^.}]+)(?:\.items)?\s*\}\}$/);
      if (match) {
        const referenced = steps.find(
          (step) => workflowStepId(step) === match[1],
        );
        const inferred = inferWorkflowStepFields(
          referenced,
          containers,
          fallbackSchemaName,
        );
        if (inferred.length > 0) return inferred;
      }
    }
  }

  if (workflow.returnStep) {
    const referenced = steps.find(
      (step) => workflowStepId(step) === workflow.returnStep,
    );
    return inferWorkflowStepFields(referenced, containers, fallbackSchemaName);
  }

  return [];
};
