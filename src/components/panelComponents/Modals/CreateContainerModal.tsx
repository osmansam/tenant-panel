import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import {
  CreateContainerRawPayload,
  useCreateContainer,
} from "../../../utils/api/container";
import { GenericButton } from "../FormElements/GenericButton";
import TextInput from "../FormElements/TextInput";
import { H2 } from "../Typography";

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
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "POST",
        },
        GetAllDynamicModelItems: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        CreateMultipleDynamicModelItem: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "POST",
        },
        GetAllDynamicModelItemsWithPagination: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        GetPipeline: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        TestPipeline: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "POST",
        },
        HandleSearchDynamicModelItem: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        HandleFilterDynamicModelItem: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        DeleteDynamicModelItem: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "DELETE",
        },
        UpdateDynamicModelItem: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "PATCH",
        },
        UpdateMultipleDynamicModelItem: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "PATCH",
        },
        GetDynamicModelItem: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        DeleteMultipleDynamicModelItem: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "DELETE",
        },
        ExportDynamicModelItems: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: true,
          Method: "GET",
        },
        GetItemsForSelection: {
          IsAuthenticated: true,
          IsAuthorized: true,
          AuthorizeRole: [],
          IsActive: false,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <H2 className="text-lg font-semibold text-gray-900">
            {t("Create New Container")}
          </H2>
          <button
            onClick={handleClose}
            disabled={isCreating || isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <TextInput
              type="text"
              label={t("Schema Name")}
              value={schemaName}
              onChange={(value: string) => setSchemaName(value)}
              placeholder={t("Enter container schema name")}
              requiredField={true}
              disabled={isCreating || isSubmitting}
            />
            <p className="text-sm text-gray-500 mt-2">
              {t(
                "This will be the name of your container. It should be unique within the project."
              )}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <GenericButton
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isCreating || isSubmitting}
            >
              {t("Cancel")}
            </GenericButton>
            <GenericButton
              type="submit"
              disabled={!schemaName.trim() || isCreating || isSubmitting}
            >
              {isCreating || isSubmitting
                ? t("Creating...")
                : t("Create Container")}
            </GenericButton>
          </div>
        </form>
      </div>
    </div>
  );
};
