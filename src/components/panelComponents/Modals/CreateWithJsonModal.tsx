import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { parseJsonObject } from "../../../utils/jsonCreate";

interface CreateWithJsonModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  submitLabel: string;
  initialJson: object;
  isSubmitting?: boolean;
  validate: (payload: Record<string, unknown>) => string | null;
  normalize: (payload: Record<string, unknown>) => unknown;
  onSubmit: (payload: unknown) => void;
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const payload = parseAndNormalize();
      onSubmit(payload);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("Invalid JSON"));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-scale-in flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">
              {t(title)}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {t(description)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors p-1.5 rounded-lg hover:bg-neutral-100 active:scale-95"
          >
            <IoClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between gap-3">
            <label className="block text-sm font-medium text-neutral-700">
              {t("JSON payload")}
            </label>
            <button
              type="button"
              onClick={handleFormat}
              className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-50 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              {t("Format JSON")}
            </button>
          </div>

          <textarea
            value={jsonValue}
            onChange={(event) => {
              setJsonValue(event.target.value);
              if (error) setError("");
            }}
            spellCheck={false}
            className={`h-[50vh] w-full resize-y rounded-lg border px-3 py-2 font-mono text-xs leading-5 focus:outline-none focus:ring-2 focus:ring-neutral-900 ${
              error ? "border-red-400 bg-red-50" : "border-neutral-300 bg-neutral-50"
            }`}
          />

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {t("Cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2.5 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
            >
              {isSubmitting ? t("Creating...") : t(submitLabel)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
