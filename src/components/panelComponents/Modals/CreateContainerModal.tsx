import React, { useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateContainer } from "../../../utils/api/container";
import { WorkspaceDialog } from "../../ui/workspace-dialog";
import { GenericButton } from "../FormElements/GenericButton";
import TextInput from "../FormElements/TextInput";
import { buildCreateContainerPayload } from "./createContainerPayload";

interface CreateContainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateContainerModal: React.FC<CreateContainerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const formId = useId();
  const submittingRef = useRef(false);
  const [submitError, setSubmitError] = useState("");
  const [schemaName, setSchemaName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createContainerAsync, isCreating } = useCreateContainer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schemaName.trim() || submittingRef.current || isCreating) return;
    submittingRef.current = true;
    setSubmitError("");

    setIsSubmitting(true);

    const containerPayload = buildCreateContainerPayload(schemaName);

    try {
      await createContainerAsync(containerPayload);
      // Reset form and close modal on success
      setSchemaName("");
      onClose();
    } catch (error) {
      setSubmitError(t("Your collection could not be created. Your changes are still here. Please try again."));
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isCreating && !submittingRef.current) {
      setSubmitError("");
      setSchemaName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <WorkspaceDialog
      open={isOpen}
      onClose={handleClose}
      title={t("Create New Collection")}
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
            type="submit"
            form={formId}
            variant="primary"
            disabled={!schemaName.trim() || isCreating || isSubmitting}
            isLoading={isCreating || isSubmitting}
          >
            {isCreating || isSubmitting
              ? t("Creating...")
              : t("Create Collection")}
          </GenericButton>
        </div>
      }
    >
      <form id={formId} aria-label={t("Create collection")} onSubmit={handleSubmit} className="space-y-4">
        {submitError && <p role="alert" className="rounded-ui-md bg-ui-danger-subtle p-3 text-sm text-ui-danger">{submitError}</p>}
        <div>
          <TextInput
            type="text"
            label={t("Schema Name")}
            value={schemaName}
            onChange={(value: string) => { setSchemaName(value); setSubmitError(""); }}
            placeholder={t("Enter collection schema name")}
            requiredField={true}
            disabled={isCreating || isSubmitting}
          />
          <p className="mt-1.5 text-xs text-ui-muted">
            {t(
              "This will be the name of your collection. It should be unique within the project."
            )}
          </p>
        </div>
      </form>
    </WorkspaceDialog>
  );
};
