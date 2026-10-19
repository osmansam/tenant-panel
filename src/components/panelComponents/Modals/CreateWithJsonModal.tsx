import React, { useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { parseJsonObject } from "../../../utils/jsonCreate";
import { Textarea, WorkspaceDialog } from "../../ui";
import { GenericButton } from "../FormElements/GenericButton";

interface CreateWithJsonModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  submitLabel: string;
  initialJson: object;
  isSubmitting?: boolean;
  validate: (payload: Record<string, unknown>) => string | null;
  normalize: (payload: Record<string, unknown>) => unknown;
  onSubmit: (payload: unknown) => Promise<unknown> | void;
  onClose: () => void;
}

export const CreateWithJsonModal: React.FC<CreateWithJsonModalProps> = ({
  isOpen,
  title,
  description,
  submitLabel,
  initialJson,
  isSubmitting = false,
  validate,
  normalize,
  onSubmit,
  onClose,
}) => {
  const { t } = useTranslation();
  const formId = useId();
  const payloadId = useId();
  const errorId = useId();
  const submittingRef = useRef(false);
  const [isSaving, setIsSaving] = useState(false);
  const busy = isSubmitting || isSaving;
  const requestClose = () => { if (!isSubmitting && !submittingRef.current) onClose(); };
  const initialValue = useMemo(
    () => JSON.stringify(initialJson, null, 2),
    [initialJson],
  );
  const [jsonValue, setJsonValue] = useState(initialValue);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (!isOpen) return;
    setJsonValue(initialValue);
    setError("");
  }, [initialValue, isOpen]);

  const parseAndNormalize = () => {
    const parsed = parseJsonObject(jsonValue);
    const validationError = validate(parsed);
    if (validationError) {
      throw new Error(validationError);
    }
    return normalize(parsed);
  };

  const handleFormat = () => {
    try {
      const payload = parseAndNormalize();
      setJsonValue(JSON.stringify(payload, null, 2));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("Invalid JSON"));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting || submittingRef.current) return;
    try {
      const payload = parseAndNormalize();
      submittingRef.current = true;
      setIsSaving(true);
      setError("");
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("Your changes could not be saved. Please try again."));
    } finally {
      submittingRef.current = false;
      setIsSaving(false);
    }
  };

  return (
    <WorkspaceDialog
      open={isOpen}
      onClose={requestClose}
      title={t(title)}
      description={t(description)}
      className="max-w-2xl"
      footer={
        <div className="flex items-center justify-end gap-2.5">
          <GenericButton
            type="button"
            variant="outline"
            onClick={requestClose}
            disabled={busy}
          >
            {t("Cancel")}
          </GenericButton>
          <GenericButton
            type="submit"
            form={formId}
            variant="primary"
            disabled={busy}
            isLoading={busy}
          >
            {busy ? t("Saving…") : t(submitLabel)}
          </GenericButton>
        </div>
      }
    >
      <form id={formId} onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor={payloadId} className="block text-xs font-semibold uppercase tracking-wider text-ui-muted">
            {t("JSON payload")}
          </label>
          <GenericButton
            type="button"
            variant="secondary"
            size="sm"
            disabled={busy}
            onClick={handleFormat}
            className="h-7 text-xs"
          >
            {t("Format JSON")}
          </GenericButton>
        </div>

        <Textarea
          id={payloadId}
          disabled={busy}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          value={jsonValue}
          onChange={(event) => {
            setJsonValue(event.target.value);
            if (error) setError("");
          }}
          spellCheck={false}
          className={`h-[45vh] w-full resize-y rounded-ui-md border p-3 font-mono text-xs leading-5 focus:outline-none focus:ring-1 focus:ring-ui-primary ${
            error
              ? "border-ui-danger bg-ui-danger-subtle text-ui-foreground"
              : "border-ui-border bg-ui-surface-subtle text-ui-foreground"
          }`}
        />

        {error && <p role="alert" id={errorId} className="text-xs text-ui-danger">{error}</p>}
      </form>
    </WorkspaceDialog>
  );
};
