import { useTranslation } from "react-i18next";
import { FiEdit, FiGitBranch, FiPlus, FiTrash2 } from "react-icons/fi";
import type { ContainerModel, PipelineStage } from "../../../utils/api/container";
import { Badge } from "../../ui";
import { GenericButton } from "../FormElements/GenericButton";

export interface ContainerPipelinesTabProps {
  container: ContainerModel;
  isPipelinesUpdating: boolean;
  setIsAddPipelineModalOpen: (open: boolean) => void;
  handleEditPipeline: (pipeline: PipelineStage) => void;
  handleDeletePipeline: (name: string) => void;
}

export function ContainerPipelinesTab({
  container,
  isPipelinesUpdating,
  setIsAddPipelineModalOpen,
  handleEditPipeline,
  handleDeletePipeline,
}: ContainerPipelinesTabProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {/* Pipelines Header */}
      <div className="flex items-center justify-between sticky top-0 bg-ui-surface pb-4 border-b">
        <div>
          <h4 className="text-sm font-medium text-ui-foreground">
            {t("Pipelines")} ({(container.pipelines || []).length})
          </h4>
          <p className="text-xs text-ui-muted mt-1">
            {t(
              "Manage MongoDB aggregation pipelines for this collection"
            )}
          </p>
        </div>
        <GenericButton
          variant="outline"
          size="sm"
          onClick={() => setIsAddPipelineModalOpen(true)}
          iconLeft={<FiPlus size={12} />}
          disabled={isPipelinesUpdating}
        >
          {t("Add Pipeline")}
        </GenericButton>
      </div>

      {/* Pipelines List */}
      <div className="space-y-3">
        {(container.pipelines || []).map((pipeline, index) => (
          <div
            key={pipeline.name || index}
            className="bg-ui-surface-subtle rounded-ui-md p-4 hover:bg-ui-surface-subtle transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-ui-foreground">
                    {pipeline.name}
                  </span>
                  {pipeline.isActive ? (
                    <Badge variant="success">
{t("Active")}
</Badge>
                  ) : (
                    <Badge variant="neutral">
{t("Inactive")}
</Badge>
                  )}
                  {pipeline.isRedisCached && (
                    <Badge variant="info">
{t("Cached")} ({pipeline.cacheTime}s)
</Badge>
                  )}
                  {pipeline.isAuthenticated && (
                    <Badge variant="warning">
{t("Auth Required")}
</Badge>
                  )}
                  {pipeline.isAuthorized && (
                    <Badge variant="warning">
{t("Role Check")}
</Badge>
                  )}
                </div>

                {/* Pipeline JSON Preview */}
                <div className="mt-2">
                  <details className="text-xs">
                    <summary className="cursor-pointer text-ui-muted hover:text-ui-foreground font-medium">
                      {t("View Pipeline JSON")}
                    </summary>
                    <pre className="mt-2 p-3 bg-ui-ink-hover text-ui-success rounded overflow-x-auto text-xs">
                      {pipeline.pipelineJson}
                    </pre>
                  </details>
                </div>

                {/* Roles */}
                {pipeline.isAuthorized &&
                  pipeline.authorizeRole &&
                  pipeline.authorizeRole.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-ui-muted">
                        {t("Allowed Roles")}:{" "}
                      </span>
                      <span className="text-xs text-ui-foreground">
                        {pipeline.authorizeRole.join(", ")}
                      </span>
                    </div>
                  )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPipeline(pipeline)}
                  iconLeft={<FiEdit size={10} />}
                  disabled={isPipelinesUpdating}
                >
                  {t("Edit")}
                </GenericButton>
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePipeline(pipeline.name)}
                  iconLeft={<FiTrash2 size={10} />}
                  disabled={isPipelinesUpdating}
                >
                  {t("Delete")}
                </GenericButton>
              </div>
            </div>
          </div>
        ))}

        {(!container.pipelines ||
          container.pipelines.length === 0) && (
          <div className="text-center py-12 text-ui-muted">
            <FiGitBranch
              size={48}
              className="mx-auto mb-4 text-ui-placeholder"
            />
            <p className="mb-2">
              {t("No pipelines defined for this collection")}
            </p>
            <GenericButton
              variant="outline"
              size="sm"
              onClick={() => setIsAddPipelineModalOpen(true)}
              iconLeft={<FiPlus size={12} />}
              className="mt-2"
            >
              {t("Add Your First Pipeline")}
            </GenericButton>
          </div>
        )}
      </div>
    </div>
  );
}
