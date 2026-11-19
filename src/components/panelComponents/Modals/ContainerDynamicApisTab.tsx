import { useTranslation } from "react-i18next";
import { FiEdit, FiGlobe, FiPlus, FiTrash2 } from "react-icons/fi";
import type { ContainerModel, DynamicApiModel } from "../../../utils/api/container";
import { Badge } from "../../ui";
import { GenericButton } from "../FormElements/GenericButton";

export interface ContainerDynamicApisTabProps {
  container: ContainerModel;
  isDynamicApisUpdating: boolean;
  setIsAddDynamicApiModalOpen: (open: boolean) => void;
  handleEditDynamicApi: (api: DynamicApiModel) => void;
  handleDeleteDynamicApi: (name: string) => void;
}

export function ContainerDynamicApisTab({
  container,
  isDynamicApisUpdating,
  setIsAddDynamicApiModalOpen,
  handleEditDynamicApi,
  handleDeleteDynamicApi,
}: ContainerDynamicApisTabProps) {
  const { t } = useTranslation();
  return (
    <div className="h-full space-y-4 overflow-y-auto">
      <div className="sticky top-0 flex items-center justify-between border-b bg-ui-surface pb-4">
        <div>
          <h4 className="text-sm font-medium text-ui-foreground">
            {t("Dynamic APIs")} ({(container.dynamicApis || []).length})
          </h4>
          <p className="mt-1 text-xs text-ui-muted">
            {t("Manage outbound or proxy APIs for this collection")}
          </p>
        </div>
        <GenericButton
          variant="outline"
          size="sm"
          onClick={() => setIsAddDynamicApiModalOpen(true)}
          iconLeft={<FiPlus size={12} />}
          disabled={isDynamicApisUpdating}
        >
          {t("Add API")}
        </GenericButton>
      </div>

      <div className="space-y-3">
        {(container.dynamicApis || []).map((dynamicApi, index) => (
          <div
            key={dynamicApi.name || index}
            className="rounded-ui-md bg-ui-surface-subtle p-4 transition-colors hover:bg-ui-surface-subtle"
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="font-medium text-ui-foreground">
                    {dynamicApi.name}
                  </span>
                  <span className="inline-flex rounded bg-ui-surface-subtle px-2 py-0.5 font-mono text-xs font-medium text-ui-foreground">
                    {dynamicApi.method || "GET"}
                  </span>
                  {dynamicApi.isActive ? (
                    <Badge variant="success">
                      {t("Active")}
                    </Badge>
                  ) : (
                    <Badge variant="neutral">
                      {t("Inactive")}
                    </Badge>
                  )}
                  {dynamicApi.isRedisCached && (
                    <Badge variant="info">
                      {t("Cached")} ({dynamicApi.cacheTime}s)
                    </Badge>
                  )}
                  {dynamicApi.isAuthenticated && (
                    <Badge variant="warning">
                      {t("Auth Required")}
                    </Badge>
                  )}
                  {dynamicApi.isAuthorized && (
                    <Badge variant="warning">
                      {t("Role Check")}
                    </Badge>
                  )}
                </div>

                <p className="break-all font-mono text-xs text-ui-muted">
                  {dynamicApi.url}
                </p>

                {!!dynamicApi.dependencies?.length && (
                  <div className="mt-2">
                    <span className="text-xs text-ui-muted">
                      {t("Dependencies")}:{" "}
                    </span>
                    <span className="text-xs text-ui-foreground">
                      {dynamicApi.dependencies.join(", ")}
                    </span>
                  </div>
                )}

                {dynamicApi.isAuthorized &&
                  dynamicApi.authorizeRole &&
                  dynamicApi.authorizeRole.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-ui-muted">
                        {t("Allowed Roles")}:{" "}
                      </span>
                      <span className="text-xs text-ui-foreground">
                        {dynamicApi.authorizeRole.join(", ")}
                      </span>
                    </div>
                  )}
              </div>

              <div className="ml-4 flex items-center space-x-2">
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditDynamicApi(dynamicApi)}
                  iconLeft={<FiEdit size={10} />}
                  disabled={isDynamicApisUpdating}
                >
                  {t("Edit")}
                </GenericButton>
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleDeleteDynamicApi(dynamicApi.name)
                  }
                  iconLeft={<FiTrash2 size={10} />}
                  disabled={isDynamicApisUpdating}
                >
                  {t("Delete")}
                </GenericButton>
              </div>
            </div>
          </div>
        ))}

        {(!container.dynamicApis ||
          container.dynamicApis.length === 0) && (
          <div className="py-12 text-center text-ui-muted">
            <FiGlobe
              size={48}
              className="mx-auto mb-4 text-ui-placeholder"
            />
            <p className="mb-2">
              {t("No Dynamic APIs defined for this collection")}
            </p>
            <GenericButton
              variant="outline"
              size="sm"
              onClick={() => setIsAddDynamicApiModalOpen(true)}
              iconLeft={<FiPlus size={12} />}
              className="mt-2"
            >
              {t("Add Your First API")}
            </GenericButton>
          </div>
        )}
      </div>
    </div>
  );
}
