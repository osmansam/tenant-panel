import { useRef, useState } from "react";
import type {
  BrandingAsset,
  BrandingAssetSlot,
} from "../../types/branding";
import { brandingUploadErrorMessage } from "../../utils/api/branding";

interface BrandingAssetFieldProps {
  label: string;
  hint: string;
  slot: BrandingAssetSlot;
  stored?: BrandingAsset;
  effectiveUrl: string;
  inherited: boolean;
  busy: boolean;
  onUpload: (slot: BrandingAssetSlot, file: File) => Promise<void>;
  onReset: (slot: BrandingAssetSlot) => Promise<void>;
}

const acceptedTypes = new Set(["image/png", "image/jpeg", "image/webp"]);

export function BrandingAssetField({
  label,
  hint,
  slot,
  stored,
  effectiveUrl,
  inherited,
  busy,
  onUpload,
  onReset,
}: BrandingAssetFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const selectFile = async (file?: File) => {
    if (!file) return;
    if (!acceptedTypes.has(file.type)) {
      setError("Choose a PNG, JPEG, or WebP image");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be 2 MB or smaller");
      return;
    }
    setError("");
    try {
      await onUpload(slot, file);
    } catch (uploadError: unknown) {
      setError(brandingUploadErrorMessage(uploadError));
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-2">
          {effectiveUrl ? (
            <img src={effectiveUrl} alt="" className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="text-xs text-neutral-400">No image</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-neutral-900">{label}</h3>
            {inherited && (
              <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700">
                Inherited
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-neutral-500">{hint}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(event) => void selectFile(event.target.files?.[0])}
            />
            <button
              type="button"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {stored ? "Replace" : "Upload"}
            </button>
            {stored && (
              <button
                type="button"
                disabled={busy}
                onClick={() => void onReset(slot)}
                className="rounded-lg border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
              >
                Use default
              </button>
            )}
          </div>
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
