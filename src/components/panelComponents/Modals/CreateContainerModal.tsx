import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CreateContainerRawPayload,
  useCreateContainer,
} from "../../../utils/api/container";
import { WorkspaceDialog } from "../../ui/workspace-dialog";
import { GenericButton } from "../FormElements/GenericButton";
import TextInput from "../FormElements/TextInput";

interface CreateContainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateContainerModal: React.FC<CreateContainerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const [schemaName, setSchemaName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createContainer, isCreating } = useCreateContainer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schemaName.trim()) return;

    setIsSubmitting(true);

    // Create the container payload with default values matching Go backend format
    const containerPayload: CreateContainerRawPayload = {
      SchemaName: schemaName.trim(),
      Fields: [], // Empty fields array as requested
      Routes: {
        CreateDynamicModelItem: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "POST",
        },
        GetAllDynamicModelItems: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        CreateMultipleDynamicModelItem: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "POST",
        },
        GetAllDynamicModelItemsWithPagination: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        GetPipeline: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        TestPipeline: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "POST",
        },
        HandleSearchDynamicModelItem: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        HandleFilterDynamicModelItem: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        DeleteDynamicModelItem: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "DELETE",
        },
        UpdateDynamicModelItem: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "PATCH",
        },
        UpdateMultipleDynamicModelItem: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "PATCH",
        },
        GetDynamicModelItem: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        DeleteMultipleDynamicModelItem: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "DELETE",
        },
        ExportDynamicModelItems: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        GetItemsForSelection: {
          IsAuthenticated: false,
          IsAuthorized: false,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
      },
      Redis: {
        IsRedisCached: false,
        CacheTime: 10,
        TriggeredRedisCaches: [],
      },
      Pipelines: [],
      DynamicFunctions: [],
      DynamicApis: [],
      IsAuthContainer: false,
      IsRegisterActive: false,
      PopulatedRoutes: [],
      Indexes: null,
      RowAccess: null,
    };

    try {
      createContainer(containerPayload);
      // Reset form and close modal on success
      setSchemaName("");
      onClose();
    } catch (error) {
      console.error("Failed to create container:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isCreating && !isSubmitting) {
      setSchemaName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <WorkspaceDialog
      open={isOpen}
      onClose={handleClose}
      title={t("Create New Container")}
      description={t("Set up a new collection schema for this project.")}
      className="max-w-md"
      footer={
        <div className="flex justify-end gap-2.5">
          <GenericButton
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isCreating || isSubmitting}
          >
            {t("Cancel")}
          </GenericButton>
          <GenericButton
            type="button"
            variant="primary"
            onClick={handleSubmit}
            disabled={!schemaName.trim() || isCreating || isSubmitting}
            isLoading={isCreating || isSubmitting}
          >
            {isCreating || isSubmitting
              ? t("Creating...")
              : t("Create Container")}
          </GenericButton>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextInput
            type="text"
            label={t("Schema Name")}
            value={schemaName}
            onChange={(value: string) => setSchemaName(value)}
            placeholder={t("Enter container schema name")}
            requiredField={true}
            disabled={isCreating || isSubmitting}
          />
          <p className="mt-1.5 text-xs text-ui-muted">
            {t(
              "This will be the name of your container. It should be unique within the project."
            )}
          </p>
        </div>
      </form>
    </WorkspaceDialog>
  );
};
