import React, { useEffect, useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { CheckSwitch } from "../../../common/CheckSwitch";
import { OptionType } from "../../../types";
import { DynamicWorkflow } from "../../../utils/api/container";
import { useRoleItems } from "../../../utils/api/roleInfo";
import { ResponsiveActionBar, WorkspaceDialog, Textarea } from "../../ui";
import { GenericButton } from "../FormElements/GenericButton";
import SelectInput from "../FormElements/SelectInput";
import TextInput from "../FormElements/TextInput";

interface AddWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWorkflow: (workflow: DynamicWorkflow) => boolean | Promise<boolean>;
  editWorkflow?: DynamicWorkflow | null;
}

const defaultWorkflow: Partial<DynamicWorkflow> = {
  name: "",
  trigger: "manual",
  mode: "transactional",
  isActive: true,
  isAuthenticated: false,
  isAuthorized: false,
  authorizeRole: [],
  description: "",
  returnStep: "",
  outputFields: [],
  timeoutSec: 30,
  stopOnError: true,
  runInTransaction: false,
  isRedisCached: false,
  cacheTime: 0,
  payload: {},
  conditions: [],
  steps: [],
};

const triggerOptions: OptionType[] = [
  { value: "manual", label: "Manual" },
  { value: "before_create", label: "Before Create" },
  { value: "after_create", label: "After Create" },
  { value: "before_update", label: "Before Update" },
  { value: "after_update", label: "After Update" },
  { value: "before_delete", label: "Before Delete" },
  { value: "after_delete", label: "After Delete" },
  { value: "cron", label: "Cron" },
];

const modeOptions: OptionType[] = [
  { value: "transactional", label: "Transactional" },
  { value: "outbox", label: "Outbox" },
  { value: "hybrid", label: "Hybrid" },
];

const formatJson = (value: unknown) => JSON.stringify(value ?? {}, null, 2);
const formatJsonArray = (value: unknown) =>
  JSON.stringify(Array.isArray(value) ? value : [], null, 2);

// Largest whole-minute TTL supported by the backend's Go time.Duration.
const MAX_WORKFLOW_CACHE_MINUTES = 153_722_867;
const isValidCacheTime = (value: number) =>
  Number.isSafeInteger(value) && value >= 0 && value <= MAX_WORKFLOW_CACHE_MINUTES;

export const AddWorkflowModal: React.FC<AddWorkflowModalProps> = ({
  isOpen,
  onClose,
  onAddWorkflow,
  editWorkflow = null,
}) => {
  const { t } = useTranslation();
  const jsonInputId = useId();
  const { data: roleItems = [] } = useRoleItems();
  const roleOptions: OptionType[] = useMemo(
    () => roleItems.map((role) => ({ value: role._id, label: role.name })),
    [roleItems]
  );

  const [workflowData, setWorkflowData] =
    useState<Partial<DynamicWorkflow>>(defaultWorkflow);
  const [payloadJson, setPayloadJson] = useState("{}");
  const [conditionsJson, setConditionsJson] = useState("[]");
  const [stepsJson, setStepsJson] = useState("[]");
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const nextWorkflow = editWorkflow || defaultWorkflow;
    setWorkflowData({
      ...defaultWorkflow,
      ...nextWorkflow,
      authorizeRole: nextWorkflow.authorizeRole || [],
      outputFields: nextWorkflow.outputFields || [],
    });
    setPayloadJson(formatJson(nextWorkflow.payload || {}));
    setConditionsJson(formatJsonArray(nextWorkflow.conditions || []));
    setStepsJson(formatJsonArray(nextWorkflow.steps || []));
    setJsonErrors({});
    setFormKey((prev) => prev + 1);
  }, [editWorkflow, isOpen]);

  const parseJson = (label: string, value: string, expected: "object" | "array") => {
    try {
      const parsed = value.trim() ? JSON.parse(value) : expected === "array" ? [] : {};
      if (expected === "array" && !Array.isArray(parsed)) {
        return { error: t(`${label} must be a JSON array`) };
      }
      if (
        expected === "object" &&
        (Array.isArray(parsed) || parsed === null || typeof parsed !== "object")
      ) {
        return { error: t(`${label} must be a JSON object`) };
      }
      return { value: parsed };
    } catch {
      return { error: t(`${label} has invalid JSON`) };
    }
  };

  const handleSubmit = async () => {
    if (!workflowData.name?.trim()) {
      toast.error(t("Workflow name is required"));
      return;
    }

    if (workflowData.trigger === "cron" && !workflowData.schedule?.trim()) {
      toast.error(t("Schedule is required for cron workflows"));
      return;
    }

    const payloadResult = parseJson("Payload", payloadJson, "object");
    const conditionsResult = parseJson("Conditions", conditionsJson, "array");
    const stepsResult = parseJson("Steps", stepsJson, "array");
    const cacheTime = workflowData.cacheTime ?? 0;
    const cacheTimeError = workflowData.isRedisCached && !isValidCacheTime(cacheTime)
      ? t("Enter a whole number of minutes between 0 and 153722867. Zero uses the server default.")
      : undefined;
    const errors = {
      ...(payloadResult.error ? { payload: payloadResult.error } : {}),
      ...(conditionsResult.error ? { conditions: conditionsResult.error } : {}),
      ...(stepsResult.error ? { steps: stepsResult.error } : {}),
      ...(cacheTimeError ? { cacheTime: cacheTimeError } : {}),
    };
    setJsonErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error(cacheTimeError || t("Please fix JSON errors before saving"));
      return;
    }

    const workflow: DynamicWorkflow = {
      id: workflowData.id,
      name: workflowData.name.trim(),
      version: workflowData.version,
      trigger: workflowData.trigger || "manual",
      ...(workflowData.trigger === "cron"
        ? {
            schedule: workflowData.schedule?.trim(),
            ...(workflowData.timezone?.trim()
              ? { timezone: workflowData.timezone.trim() }
              : {}),
          }
        : {}),
      mode: workflowData.mode || "transactional",
      isActive: workflowData.isActive ?? true,
      isAuthenticated: Boolean(workflowData.isAuthenticated || workflowData.isAuthorized),
      isAuthorized: workflowData.isAuthorized || false,
      authorizeRole: workflowData.isAuthorized ? workflowData.authorizeRole || [] : [],
      description: workflowData.description?.trim() || undefined,
      payload: payloadResult.value,
      conditions: conditionsResult.value,
      steps: stepsResult.value,
      stopOnError: workflowData.stopOnError ?? true,
      timeoutSec: workflowData.timeoutSec || undefined,
      returnStep: workflowData.returnStep?.trim() || undefined,
      outputFields: (workflowData.outputFields || []).filter(Boolean),
      runInTransaction: workflowData.runInTransaction || false,
      isRedisCached: workflowData.isRedisCached ?? false,
      cacheTime,
    };

    const saved = await onAddWorkflow(workflow);
    if (saved !== false) {
      handleClose();
    }
  };

  const handleClose = () => {
    setWorkflowData(defaultWorkflow);
    setPayloadJson("{}");
    setConditionsJson("[]");
    setStepsJson("[]");
    setJsonErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <WorkspaceDialog
      open={isOpen}
      onClose={handleClose}
      layer="nested"
      className="max-w-4xl"
      title={editWorkflow ? t("Edit Workflow") : t("Add New Workflow")}
      footer={<ResponsiveActionBar><GenericButton variant="outline" onClick={handleClose}>{t("Cancel")}</GenericButton><GenericButton onClick={handleSubmit}>{editWorkflow ? t("Update Workflow") : t("Add Workflow")}</GenericButton></ResponsiveActionBar>}
    >
          <div className="space-y-6">
            <TextInput
              key={`workflow-name-${formKey}`}
              label={t("Workflow Name")}
              type="text"
              value={workflowData.name || ""}
              onChange={(value: string) => setWorkflowData({ ...workflowData, name: value })}
              placeholder={t("e.g., create-order")}
              requiredField={true}
              disabled={!!editWorkflow}
            />

            <TextInput
              key={`workflow-description-${formKey}`}
              label={t("Description")}
              type="text"
              value={workflowData.description || ""}
              onChange={(value: string) => setWorkflowData({ ...workflowData, description: value })}
              placeholder={t("Optional workflow description")}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectInput
                label={t("Trigger")}
                options={triggerOptions}
                value={triggerOptions.find((option) => option.value === workflowData.trigger) || triggerOptions[0]}
                onChange={(selected) =>
                  setWorkflowData({
                    ...workflowData,
                    trigger: String((selected as OptionType).value),
                    ...(String((selected as OptionType).value) !== "cron"
                      ? { schedule: undefined, timezone: undefined }
                      : {}),
                  })
                }
                isMultiple={false}
              />
              <SelectInput
                label={t("Mode")}
                options={modeOptions}
                value={modeOptions.find((option) => option.value === workflowData.mode) || modeOptions[0]}
                onChange={(selected) =>
                  setWorkflowData({ ...workflowData, mode: String((selected as OptionType).value) })
                }
                isMultiple={false}
              />
            </div>

            {workflowData.trigger === "cron" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput
                  key={`workflow-schedule-${formKey}`}
                  label={t("Schedule")}
                  type="text"
                  value={workflowData.schedule || ""}
                  onChange={(value: string) =>
                    setWorkflowData({ ...workflowData, schedule: value })
                  }
                  placeholder="0 * * * *"
                  requiredField={true}
                />
                <TextInput
                  key={`workflow-timezone-${formKey}`}
                  label={t("Timezone")}
                  type="text"
                  value={workflowData.timezone || ""}
                  onChange={(value: string) =>
                    setWorkflowData({ ...workflowData, timezone: value })
                  }
                  placeholder="America/Chicago"
                />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput
                key={`workflow-return-step-${formKey}`}
                label={t("Return Step")}
                type="text"
                value={workflowData.returnStep || ""}
                onChange={(value: string) => setWorkflowData({ ...workflowData, returnStep: value })}
                placeholder={t("Optional step id or name")}
              />
              <TextInput
                key={`workflow-output-fields-${formKey}`}
                label={t("Output Fields")}
                type="text"
                value={(workflowData.outputFields || []).join(", ")}
                onChange={(value: string) =>
                  setWorkflowData({
                    ...workflowData,
                    outputFields: value.split(",").map((field) => field.trim()).filter(Boolean),
                  })
                }
                placeholder={t("fieldA, fieldB")}
              />
            </div>

            <TextInput
              label={t("Timeout (seconds)")}
              key={`workflow-timeout-${formKey}`}
              type="number"
              value={workflowData.timeoutSec?.toString() || ""}
              onChange={(value: string) =>
                setWorkflowData({ ...workflowData, timeoutSec: parseInt(value) || undefined })
              }
              placeholder="30"
            />

            <div className="space-y-3 rounded-lg bg-ui-surface-subtle p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <label className="text-sm font-medium text-ui-foreground">{t("Cache Results")}</label>
                  <p className="text-xs text-ui-muted">
                    {t("Only public, read-only manual workflows are eligible. Other executions bypass caching.")}
                  </p>
                </div>
                <CheckSwitch
                  ariaLabel={t("Cache Results")}
                  checked={Boolean(workflowData.isRedisCached)}
                  onChange={() => {
                    setWorkflowData({
                      ...workflowData,
                      isRedisCached: !workflowData.isRedisCached,
                      cacheTime: isValidCacheTime(workflowData.cacheTime ?? 0) ? workflowData.cacheTime ?? 0 : 0,
                    });
                    setJsonErrors((previous) => {
                      const next = { ...previous };
                      delete next.cacheTime;
                      return next;
                    });
                  }}
                />
              </div>
              {workflowData.isRedisCached && (
                <div>
                  <TextInput
                    key={`workflow-cache-time-${formKey}`}
                    label={t("Cache Duration (minutes)")}
                    type="number"
                    value={workflowData.cacheTime?.toString() ?? "0"}
                    isMinNumber={false}
                    onChange={(value: string | number) => {
                      setWorkflowData({ ...workflowData, cacheTime: Number(value) });
                      setJsonErrors((previous) => {
                        const next = { ...previous };
                        delete next.cacheTime;
                        return next;
                      });
                    }}
                    error={jsonErrors.cacheTime}
                  />
                  <p className="mt-1 text-xs text-ui-muted">{t("0 uses the server default.")}</p>
                </div>
              )}
            </div>

            {[
              ["Active", "Enable or disable this workflow", "isActive"],
              ["Require Authentication", "Users must be logged in to execute this workflow", "isAuthenticated"],
              ["Require Authorization", "Users must have specific roles to execute this workflow", "isAuthorized"],
              ["Stop On Error", "Stop workflow execution when a step fails", "stopOnError"],
              ["Run In Transaction", "Run write workflow steps in a transaction", "runInTransaction"],
            ].map(([label, description, key]) => (
              <div key={key} className="flex items-center justify-between rounded-lg bg-ui-surface-subtle p-3">
                <div>
                  <label className="text-sm font-medium text-ui-foreground">{t(label)}</label>
                  <p className="text-xs text-ui-muted">{t(description)}</p>
                </div>
                <CheckSwitch
                  ariaLabel={t(label)}
                  checked={Boolean((workflowData as any)[key])}
                  onChange={() =>
                    setWorkflowData({
                      ...workflowData,
                      ...(key === "isAuthenticated"
                        ? {
                            isAuthenticated: !workflowData.isAuthenticated,
                            ...(!workflowData.isAuthenticated
                              ? {}
                              : { isAuthorized: false, authorizeRole: [] }),
                          }
                        : key === "isAuthorized"
                          ? {
                              isAuthenticated: !workflowData.isAuthorized
                                ? true
                                : workflowData.isAuthenticated,
                              isAuthorized: !workflowData.isAuthorized,
                              ...(workflowData.isAuthorized
                                ? { authorizeRole: [] }
                                : {}),
                            }
                          : { [key]: !Boolean((workflowData as any)[key]) }),
                    })
                  }
                />
              </div>
            ))}

            {workflowData.isAuthorized && (
              <SelectInput
                label={t("Authorized Roles")}
                options={roleOptions}
                value={roleOptions.filter((option) =>
                  workflowData.authorizeRole?.includes(String(option.value))
                )}
                onChange={(selected) =>
                  setWorkflowData({
                    ...workflowData,
                    authorizeRole: selected
                      ? (selected as OptionType[]).map((option) => String(option.value))
                      : [],
                  })
                }
                placeholder={t("Select roles...")}
                isMultiple={true}
              />
            )}

            {[
              ["Payload", payloadJson, setPayloadJson, "payload"],
              ["Conditions", conditionsJson, setConditionsJson, "conditions"],
              ["Steps", stepsJson, setStepsJson, "steps"],
            ].map(([label, value, setter, key]) => (
              <div key={String(key)}>
                <label htmlFor={`${jsonInputId}-${String(key)}`} className="mb-2 block text-sm font-medium text-ui-foreground">{t(String(label))}</label>
                <Textarea
                  id={`${jsonInputId}-${String(key)}`}
                  invalid={Boolean(jsonErrors[String(key)])}
                  aria-describedby={jsonErrors[String(key)] ? `${jsonInputId}-${String(key)}-error` : undefined}
                  value={String(value)}
                  onChange={(event) => (setter as React.Dispatch<React.SetStateAction<string>>)(event.target.value)}
                  className={`h-40 w-full rounded-lg border px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ui-focus ${
                    jsonErrors[String(key)] ? "border-ui-danger/30 bg-ui-danger-subtle" : "border-ui-border bg-ui-surface-subtle"
                  }`}
                />
                {jsonErrors[String(key)] && (
                  <p id={`${jsonInputId}-${String(key)}-error`} role="alert" className="mt-1 text-xs text-ui-danger">{jsonErrors[String(key)]}</p>
                )}
              </div>
            ))}
          </div>

    </WorkspaceDialog>
  );
};
