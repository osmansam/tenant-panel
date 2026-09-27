import { useRef, useState } from "react";
import { FiGlobe, FiImage, FiMinimize2, FiRotateCcw, FiUpload } from "react-icons/fi";
import type {
  BrandingAsset,
  BrandingAssetSlot,
} from "../../types/branding";
import { brandingUploadErrorMessage } from "../../utils/api/branding";
import { Badge } from "../ui";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";

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

const slotIcons = {
  logo: FiImage,
  compactLogo: FiMinimize2,
  favicon: FiGlobe,
};

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
  const [imgError, setImgError] = useState(false);
  const SlotIcon = slotIcons[slot] || FiImage;

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
    setImgError(false);
    try {
      await onUpload(slot, file);
    } catch (uploadError: unknown) {
      setError(brandingUploadErrorMessage(uploadError));
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const hasValidImage = Boolean(effectiveUrl) && !imgError;

  return (
    <div className="flex flex-col justify-between rounded-ui-xl border border-ui-border bg-ui-surface p-5 shadow-ui-sm transition-all hover:border-ui-border-strong">
      <div>
        {/* Standardized Header */}
        <div className="flex h-8 items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-ui-md bg-ui-surface-subtle text-ui-primary border border-ui-border/60">
              <SlotIcon size={16} />
            </div>
            <h3 className="truncate text-sm font-semibold text-ui-foreground">{label}</h3>
          </div>
          <Badge variant={inherited ? "info" : stored ? "success" : "neutral"} className="shrink-0">
            {inherited ? "Inherited" : stored ? "Custom" : "Default"}
          </Badge>
        </div>

        {/* Standardized Dropzone Preview */}
        <div
          onClick={() => inputRef.current?.click()}
          className="group relative mt-3 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-ui-lg border-2 border-dashed border-ui-border bg-ui-surface-subtle/40 p-4 transition-all hover:border-ui-primary hover:bg-ui-surface-subtle"
        >
          {hasValidImage ? (
            <img
              src={effectiveUrl}
              alt=""
              onError={() => setImgError(true)}
              className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <FiUpload className="h-6 w-6 text-ui-placeholder group-hover:text-ui-primary transition-colors mb-1.5" />
              <span className="text-xs font-medium text-ui-muted group-hover:text-ui-foreground">
                {inherited ? "Inherited from tenant" : "Click to upload image"}
              </span>
            </div>
          )}
        </div>

        {/* Standardized Description Area */}
        <div className="mt-3 min-h-[2.5rem]">
          <p className="text-xs text-ui-muted leading-relaxed">{hint}</p>
          {error && <p className="mt-1 text-xs text-ui-danger">{error}</p>}
        </div>
      </div>

      {/* Standardized 2-Button Footer Grid */}
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-ui-border pt-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(event) => void selectFile(event.target.files?.[0])}
        />
        <GenericButton
          size="sm"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          iconLeft={<FiUpload size={13} />}
          variant={stored ? "outline" : "primary"}
          className="w-full"
        >
          {stored ? "Replace" : "Upload"}
        </GenericButton>
        <GenericButton
          size="sm"
          variant="outline"
          disabled={busy || !stored}
          onClick={() => stored && void onReset(slot)}
          iconLeft={<FiRotateCcw size={13} />}
          className={`w-full ${!stored ? "opacity-40 cursor-not-allowed" : ""}`}
          title={!stored ? "Currently using tenant default" : undefined}
        >
          Use default
        </GenericButton>
      </div>
    </div>
  );
}
