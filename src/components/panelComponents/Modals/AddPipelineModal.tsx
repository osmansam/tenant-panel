import React, { useEffect, useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { CheckSwitch } from "../../../common/CheckSwitch";
import { OptionType } from "../../../types";
import { PipelineStage } from "../../../utils/api/container";
import { useRoleItems } from "../../../utils/api/roleInfo";
import { ResponsiveActionBar, WorkspaceDialog, Textarea } from "../../ui";
import { GenericButton } from "../FormElements/GenericButton";
import SelectInput from "../FormElements/SelectInput";
import TextInput from "../FormElements/TextInput";

interface AddPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPipeline: (pipeline: PipelineStage) => void;
  editPipeline?: PipelineStage | null;
}

export const AddPipelineModal: React.FC<AddPipelineModalProps> = ({
  isOpen,
  onClose,
  onAddPipeline,
  editPipeline = null,
}) => {
  const { t } = useTranslation();
  const jsonInputId = useId();

  // Fetch roles from the backend
  const { data: roleItems = [] } = useRoleItems();

  const [pipelineData, setPipelineData] = useState<Partial<PipelineStage>>({
    name: "",
    pipelineJson: "",
    isAuthenticated: false,
    isAuthorized: false,
    authorizeRole: [],
    isActive: true,
    isRedisCached: false,
    cacheTime: 0,
  });

  const [jsonError, setJsonError] = useState<string>("");
  const [formKey, setFormKey] = useState(0); // Add form key for forcing re-render

  // Role options from backend
  const roleOptions: OptionType[] = useMemo(
    () =>
      roleItems.map((role) => ({
        value: role._id,
        label: role.name,
      })),
    [roleItems]
  );

  // Initialize form when editing
  useEffect(() => {
    if (editPipeline && isOpen) {
      setPipelineData({
        name: editPipeline.name,
        pipelineJson: editPipeline.pipelineJson,
        isAuthenticated: editPipeline.isAuthenticated,
        isAuthorized: editPipeline.isAuthorized,
        authorizeRole: editPipeline.authorizeRole,
        isActive: editPipeline.isActive,
        isRedisCached: editPipeline.isRedisCached,
        cacheTime: editPipeline.cacheTime,
      });
      setJsonError("");
      setFormKey((prev) => prev + 1); // Force form re-render
    } else if (isOpen) {
      // Reset to default when not editing
      setPipelineData({
        name: "",
        pipelineJson: "",
        isAuthenticated: false,
        isAuthorized: false,
        authorizeRole: [],
        isActive: true,
        isRedisCached: false,
        cacheTime: 0,
      });
      setJsonError("");
      setFormKey((prev) => prev + 1); // Force form re-render
    }
  }, [editPipeline, isOpen]);

  const validateJSON = (jsonString: string): boolean => {
    if (!jsonString.trim()) {
      setJsonError(t("Pipeline JSON cannot be empty"));
      return false;
    }

    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) {
        setJsonError(t("Pipeline JSON must be an array of stages"));
        return false;
      }
      setJsonError("");
      return true;
    } catch (error) {
      setJsonError(t("Invalid JSON format"));
      return false;
    }
  };

  const handleSubmit = () => {
    if (!pipelineData.name?.trim()) {
      toast.error(t("Pipeline name is required"));
      return;
    }

    if (!validateJSON(pipelineData.pipelineJson || "")) {
      toast.error(t("Please fix JSON errors before saving"));
      return;
    }

    const pipeline: PipelineStage = {
      name: pipelineData.name!,
      pipelineJson: pipelineData.pipelineJson!,
      isAuthenticated: Boolean(pipelineData.isAuthenticated || pipelineData.isAuthorized),
      isAuthorized: pipelineData.isAuthorized || false,
      authorizeRole: pipelineData.authorizeRole || [],
      isActive:
        pipelineData.isActive !== undefined ? pipelineData.isActive : true,
      isRedisCached: pipelineData.isRedisCached || false,
      cacheTime: pipelineData.cacheTime || 0,
    };

    onAddPipeline(pipeline);
    handleClose();
  };

  const handleClose = () => {
    setPipelineData({
      name: "",
      pipelineJson: "",
      isAuthenticated: false,
      isAuthorized: false,
      authorizeRole: [],
      isActive: true,
      isRedisCached: false,
      cacheTime: 0,
    });
    setJsonError("");
    onClose();
  };

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(pipelineData.pipelineJson || "");
      const formatted = JSON.stringify(parsed, null, 2);
      setPipelineData({ ...pipelineData, pipelineJson: formatted });
      setJsonError("");
      toast.success(t("JSON formatted successfully"));
    } catch (error) {
      toast.error(t("Invalid JSON - cannot format"));
    }
  };

  if (!isOpen) return null;

  return (
    <WorkspaceDialog
      open={isOpen}
      onClose={handleClose}
      layer="nested"
      className="max-w-3xl"
      title={editPipeline ? t("Edit Pipeline") : t("Add New Pipeline")}
      footer={<ResponsiveActionBar><GenericButton variant="outline" onClick={handleClose}>{t("Cancel")}</GenericButton><GenericButton onClick={handleSubmit}>{editPipeline ? t("Update Pipeline") : t("Add Pipeline")}</GenericButton></ResponsiveActionBar>}
    >
          <div className="space-y-6">
            {/* Pipeline Name */}
            <div>
              <TextInput
                key={`pipeline-name-${formKey}`}
                label={t("Pipeline Name")}
                type="text"
                value={pipelineData.name || ""}
                onChange={(value: string) =>
                  setPipelineData({ ...pipelineData, name: value })
                }
                placeholder={t("e.g., ssGraph, userAnalytics")}
                requiredField={true}
                disabled={!!editPipeline}
              />
              <p className="text-xs text-ui-muted mt-1">
                {editPipeline
                  ? t("Pipeline name cannot be changed when editing")
                  : t("Unique identifier for this pipeline")}
              </p>
            </div>

            {/* Pipeline JSON */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={jsonInputId} className="block text-sm font-medium text-ui-foreground">
                  {t("Pipeline JSON")} <span className="text-ui-danger">*</span>
                </label>
                <GenericButton
                  size="sm"
                  variant="outline"
                  onClick={formatJSON}
                  disabled={!pipelineData.pipelineJson}
                >
                  {t("Format JSON")}
                </GenericButton>
              </div>
              <Textarea
                id={jsonInputId}
                invalid={Boolean(jsonError)}
                aria-describedby={jsonError ? `${jsonInputId}-error` : undefined}
                value={pipelineData.pipelineJson || ""}
                onChange={(e) => {
                  setPipelineData({
                    ...pipelineData,
                    pipelineJson: e.target.value,
                  });
                  validateJSON(e.target.value);
                }}
                placeholder={`[{"$project":{"_id":0,"day":"$day","value":"$value"}}]`}
                className={`w-full h-48 px-3 py-2 text-sm font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-focus ${
                  jsonError
                    ? "border-ui-danger/30 bg-ui-danger-subtle"
                    : "border-ui-border bg-ui-surface-subtle"
                }`}
              />
              {jsonError && (
                <p id={`${jsonInputId}-error`} role="alert" className="mt-1 text-xs text-ui-danger">{jsonError}</p>
              )}
              <p className="text-xs text-ui-muted mt-1">
                {t("MongoDB aggregation pipeline as JSON array. Example:")}
                <br />
                <code className="text-xs bg-ui-surface-subtle px-1 py-0.5 rounded">
                  {`[{"$match":{"status":"active"}},{"$project":{"name":1}}]`}
                </code>
              </p>
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between bg-ui-surface-subtle p-3 rounded-lg">
              <div>
                <label className="text-sm font-medium text-ui-foreground">
                  {t("Active")}
                </label>
                <p className="text-xs text-ui-muted">
                  {t("Enable or disable this pipeline")}
                </p>
              </div>
              <CheckSwitch
                ariaLabel={t("Active")}
                onChange={() =>
                  setPipelineData({
                    ...pipelineData,
                    isActive: !pipelineData.isActive,
                  })
                }
                checked={pipelineData.isActive ?? true}
              />
            </div>

            {/* Authentication */}
            <div className="flex items-center justify-between bg-ui-surface-subtle p-3 rounded-lg">
              <div>
                <label className="text-sm font-medium text-ui-foreground">
                  {t("Require Authentication")}
                </label>
                <p className="text-xs text-ui-muted">
                  {t("Users must be logged in to access this pipeline")}
                </p>
              </div>
              <CheckSwitch
                ariaLabel={t("Require Authentication")}
                onChange={() =>
                  setPipelineData({
                    ...pipelineData,
                    isAuthenticated: !pipelineData.isAuthenticated,
                    ...(!pipelineData.isAuthenticated
                      ? {}
                      : { isAuthorized: false, authorizeRole: [] }),
                  })
                }
                checked={pipelineData.isAuthenticated || false}
              />
            </div>

            {/* Authorization */}
            <div className="flex items-center justify-between bg-ui-surface-subtle p-3 rounded-lg">
              <div>
                <label className="text-sm font-medium text-ui-foreground">
                  {t("Require Authorization")}
                </label>
                <p className="text-xs text-ui-muted">
                  {t("Users must have specific roles to access this pipeline")}
                </p>
              </div>
              <CheckSwitch
                ariaLabel={t("Require Authorization")}
                onChange={() =>
                  setPipelineData({
                    ...pipelineData,
                    isAuthorized: !pipelineData.isAuthorized,
                    isAuthenticated: !pipelineData.isAuthorized
                      ? true
                      : pipelineData.isAuthenticated,
                    ...(pipelineData.isAuthorized ? { authorizeRole: [] } : {}),
                  })
                }
                checked={pipelineData.isAuthorized || false}
              />
            </div>

            {/* Authorized Roles */}
            {pipelineData.isAuthorized && (
              <div>
                <SelectInput
                  label={t("Authorized Roles")}
                  options={roleOptions}
                  value={
                    roleOptions.filter((opt) =>
                      pipelineData.authorizeRole?.includes(String(opt.value))
                    ) || null
                  }
                  onChange={(selected) => {
                    const roles = selected
                      ? (selected as OptionType[]).map((opt) =>
                          String(opt.value)
                        )
                      : [];
                    setPipelineData({
                      ...pipelineData,
                      authorizeRole: roles,
                    });
                  }}
                  placeholder={t("Select roles...")}
                  isMultiple={true}
                  requiredField={false}
                />
                <p className="text-xs text-ui-muted mt-1">
                  {t(
                    "Select one or more roles allowed to access this pipeline"
                  )}
                </p>
              </div>
            )}

            {/* Redis Caching */}
            <div className="flex items-center justify-between bg-ui-surface-subtle p-3 rounded-lg">
              <div>
                <label className="text-sm font-medium text-ui-foreground">
                  {t("Enable Redis Caching")}
                </label>
                <p className="text-xs text-ui-muted">
                  {t("Cache pipeline results in Redis for better performance")}
                </p>
              </div>
              <CheckSwitch
                ariaLabel={t("Enable Redis Caching")}
                onChange={() =>
                  setPipelineData({
                    ...pipelineData,
                    isRedisCached: !pipelineData.isRedisCached,
                  })
                }
                checked={pipelineData.isRedisCached || false}
              />
            </div>

            {/* Cache Time */}
            {pipelineData.isRedisCached && (
              <div>
                <TextInput
                  label={t("Cache Time (seconds)")}
                  type="number"
                  value={pipelineData.cacheTime?.toString() || "0"}
                  onChange={(value: string) =>
                    setPipelineData({
                      ...pipelineData,
                      cacheTime: parseInt(value) || 0,
                    })
                  }
                  placeholder="10"
                />
                <p className="text-xs text-ui-muted mt-1">
                  {t("How long to cache the results (in seconds)")}
                </p>
              </div>
            )}
          </div>

    </WorkspaceDialog>
  );
};
