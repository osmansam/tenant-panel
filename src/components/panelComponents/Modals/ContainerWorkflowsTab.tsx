import { useTranslation } from "react-i18next";
import { FiEdit, FiPlayCircle, FiPlus, FiTrash2 } from "react-icons/fi";
import type { ContainerModel, DynamicWorkflow } from "../../../utils/api/container";
import { Badge } from "../../ui";
import { GenericButton } from "../FormElements/GenericButton";

export interface ContainerWorkflowsTabProps {
  container: ContainerModel;
  isWorkflowsUpdating: boolean;
  setIsAddWorkflowModalOpen: (open: boolean) => void;
  handleEditWorkflow: (workflow: DynamicWorkflow) => void;
  handleDeleteWorkflow: (name: string) => void;
}

export function ContainerWorkflowsTab({
  container,
  isWorkflowsUpdating,
  setIsAddWorkflowModalOpen,
  handleEditWorkflow,
  handleDeleteWorkflow,
}: ContainerWorkflowsTabProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between sticky top-0 bg-ui-surface pb-4 border-b">
        <div>
          <h4 className="text-sm font-medium text-ui-foreground">
            {t("Workflows")} ({(container.workflows || []).length})
          </h4>
          <p className="text-xs text-ui-muted mt-1">
            {t("Manage workflow definitions and access controls for this collection")}
          </p>
        </div>
        <GenericButton
          variant="outline"
          size="sm"
          onClick={() => setIsAddWorkflowModalOpen(true)}
          iconLeft={<FiPlus size={12} />}
          disabled={isWorkflowsUpdating}
        >
          {t("Add Workflow")}
        </GenericButton>
      </div>

      <div className="space-y-3">
        {(container.workflows || []).map((workflow, index) => (
          <div
            key={workflow.name || index}
            className="bg-ui-surface-subtle rounded-ui-md p-4 hover:bg-ui-surface-subtle transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="font-medium text-ui-foreground">{workflow.name}</span>
                  <Badge variant={workflow.isActive ? "success" : "neutral"}>
                    {workflow.isActive ? t("Active") : t("Inactive")}
                  </Badge>
                  <Badge variant="info">
{workflow.trigger || "manual"}
</Badge>
                  <Badge variant="neutral">
{workflow.mode || "transactional"}
</Badge>
                  {workflow.isAuthenticated && (
                    <Badge variant="warning">
{t("Auth Required")}
</Badge>
                  )}
                  {workflow.isAuthorized && (
                    <Badge variant="warning">
{t("Role Check")}
</Badge>
                  )}
                  {workflow.isRedisCached && (
                    <Badge variant="info">
                      {t("Cache enabled")} ({workflow.cacheTime ? `${workflow.cacheTime} ${t("min")}` : t("server default")})
                    </Badge>
                  )}
                  {!!workflow.outputFields?.length && (
                    <Badge variant="info">
{workflow.outputFields.length} {t("Output Fields")}
</Badge>
                  )}
                </div>

                {workflow.description && (
                  <p className="mb-2 text-xs text-ui-muted">{workflow.description}</p>
                )}

                <details className="text-xs">
                  <summary className="cursor-pointer font-medium text-ui-muted hover:text-ui-foreground">
                    {t("View Workflow JSON")}
                  </summary>
                  <pre className="mt-2 overflow-x-auto rounded bg-ui-ink-hover p-3 text-xs text-ui-success">
                    {JSON.stringify(
                      {
                        payload: workflow.payload || {},
                        conditions: workflow.conditions || [],
                        steps: workflow.steps || [],
                      },
                      null,
                      2
                    )}
                  </pre>
                </details>

                {workflow.isAuthorized &&
                  workflow.authorizeRole &&
                  workflow.authorizeRole.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-ui-muted">
                        {t("Allowed Roles")}: {" "}
                      </span>
                      <span className="text-xs text-ui-foreground">
                        {workflow.authorizeRole.join(", ")}
                      </span>
                    </div>
                  )}
              </div>

              <div className="ml-4 flex items-center space-x-2">
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditWorkflow(workflow)}
                  iconLeft={<FiEdit size={10} />}
                  disabled={isWorkflowsUpdating}
                >
                  {t("Edit")}
                </GenericButton>
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteWorkflow(workflow.name)}
                  iconLeft={<FiTrash2 size={10} />}
                  disabled={isWorkflowsUpdating}
                >
                  {t("Delete")}
                </GenericButton>
              </div>
            </div>
          </div>
        ))}

        {(!container.workflows || container.workflows.length === 0) && (
          <div className="py-12 text-center text-ui-muted">
            <FiPlayCircle size={48} className="mx-auto mb-4 text-ui-placeholder" />
            <p className="mb-2">{t("No workflows defined for this collection")}</p>
            <GenericButton
              variant="outline"
              size="sm"
              onClick={() => setIsAddWorkflowModalOpen(true)}
              iconLeft={<FiPlus size={12} />}
              className="mt-2"
            >
              {t("Add Your First Workflow")}
            </GenericButton>
          </div>
        )}
      </div>
    </div>
  );
}
