import { useTranslation } from "react-i18next";
import type { ContainerModel } from "../../../utils/api/container";
import { WorkspaceDialog } from "../../ui";
import GenericPaginatedPage from "../FormElements/GenericPaginatedPage";
import { GenericButton } from "../FormElements/GenericButton";

interface ContainerDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  container: ContainerModel | null;
}

export function ContainerDataModal({
  isOpen,
  onClose,
  container,
}: ContainerDataModalProps) {
  const { t } = useTranslation();

  if (!container) return null;

  const title = t("{{schemaName}} data", {
    schemaName: container.schemaName,
  });

  return (
    <WorkspaceDialog
      open={isOpen}
      onClose={onClose}
      size="workspace"
      title={title}
      description={t("Read-only records from {{schemaName}}", {
        schemaName: container.schemaName,
      })}
      closeLabel={t("Close data viewer")}
      footer={
        <div className="flex justify-end">
          <GenericButton variant="outline" size="sm" onClick={onClose}>
            {t("Close")}
          </GenericButton>
        </div>
      }
    >
      <GenericPaginatedPage
        schemaName={container.schemaName}
        actionsEnabled={false}
        isHeader={false}
        customTitle={title}
      />
    </WorkspaceDialog>
  );
}
