import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import type { BrandingAssetSlot } from "../../types/branding";
import {
  usePatchBranding,
  useProjectBranding,
  useResetBrandingAsset,
  useTenantBranding,
  useUploadBrandingAsset,
  type BrandingScope,
} from "../../utils/api/branding";
import { BrandingAssetField } from "./BrandingAssetField";
import { BrandingPreview } from "./BrandingPreview";
import {
  buildBrandingPatch,
  validateBrandingDraft,
  type BrandingDraft,
  type BrandingResetState,
} from "./brandingState";

interface BrandingEditorProps {
  scope: BrandingScope;
  tenantId: string;
  projectId?: string;
}

export function BrandingEditor({ scope, tenantId, projectId }: BrandingEditorProps) {
  const id = scope === "tenant" ? tenantId : projectId || "";
  const tenantQuery = useTenantBranding(scope === "tenant" ? tenantId : "");
  const projectQuery = useProjectBranding(scope === "project" ? projectId || "" : "");
  const query = scope === "tenant" ? tenantQuery : projectQuery;
  const patchMutation = usePatchBranding(scope, id, projectId);
  const uploadMutation = useUploadBrandingAsset(scope, id, projectId);
  const resetAssetMutation = useResetBrandingAsset(scope, id, projectId);
  const [draft, setDraft] = useState<BrandingDraft | null>(null);
  const [changed, setChanged] = useState<BrandingResetState>({});
  const [reset, setReset] = useState<BrandingResetState>({});
  const [errors, setErrors] = useState<Partial<Record<keyof BrandingDraft, string>>>({});

  const data = query.data;
  useEffect(() => {
    if (!data) return;
    setDraft({
      displayName: data.overrides?.displayName ?? data.effective.displayName,
      logoAlt: data.overrides?.logoAlt ?? data.effective.logoAlt,
      primaryColor: data.overrides?.primaryColor ?? data.effective.primaryColor,
      loginBrandingEnabled:
        data.overrides?.loginBrandingEnabled ?? data.effective.loginBrandingEnabled,
    });
    setChanged({});
    setReset({});
  }, [data]);

  useEffect(() => {
    const dirty = Object.values(changed).some(Boolean) || Object.values(reset).some(Boolean);
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [changed, reset]);

  const preview = useMemo(() => {
    if (!data || !draft) return null;
    return {
      ...data.effective,
      displayName: reset.displayName ? data.effective.displayName : draft.displayName,
      logoAlt: reset.logoAlt ? data.effective.logoAlt : draft.logoAlt,
      primaryColor: reset.primaryColor ? data.effective.primaryColor : draft.primaryColor,
      loginBrandingEnabled: reset.loginBrandingEnabled
        ? data.effective.loginBrandingEnabled
        : draft.loginBrandingEnabled,
    };
  }, [data, draft, reset]);

  if (query.isError) {
    return <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">Branding settings could not be loaded.</div>;
  }
  if (query.isLoading || !draft || !data || !preview) {
    return <div className="rounded-xl border bg-white p-6 text-sm text-neutral-500">Loading branding…</div>;
  }

  const updateField = <K extends keyof BrandingDraft>(field: K, value: BrandingDraft[K]) => {
    setDraft((current) => (current ? { ...current, [field]: value } : current));
    setChanged((current) => ({ ...current, [field]: true }));
    setReset((current) => ({ ...current, [field]: false }));
  };

  const inheritField = (field: keyof BrandingDraft) => {
    if (scope !== "project") return;
    setReset((current) => ({ ...current, [field]: true }));
    setChanged((current) => ({ ...current, [field]: false }));
  };

  const save = async () => {
    const nextErrors = validateBrandingDraft(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const patch = buildBrandingPatch(data.overrides || {}, draft, reset, changed);
    if (!Object.keys(patch).length) {
      toast.info("No branding changes to save");
      return;
    }
    try {
      await patchMutation.mutateAsync(patch);
      toast.success("Branding saved");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Branding could not be saved");
    }
  };

  const upload = async (slot: BrandingAssetSlot, file: File) => {
    await uploadMutation.mutateAsync({ slot, file });
    toast.success("Brand image updated");
  };
  const resetAsset = async (slot: BrandingAssetSlot) => {
    await resetAssetMutation.mutateAsync(slot);
    toast.success(scope === "project" ? "Tenant image restored" : "Default image restored");
  };

  const scalarFields: Array<{ key: "displayName" | "logoAlt"; label: string; hint: string }> = [
    { key: "displayName", label: "Display name", hint: "Shown beside your logo and in the browser title." },
    { key: "logoAlt", label: "Logo description", hint: "Accessible text used when the logo cannot be seen." },
  ];

  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">{scope === "tenant" ? "Tenant branding" : "Project branding"}</h2>
            <p className="mt-1 text-sm text-neutral-500">
              {scope === "tenant"
                ? "Defaults used by every project in this tenant."
                : "Override tenant defaults only where this project needs a different identity."}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {scalarFields.map((field) => (
              <label key={field.key} className="block">
                <span className="flex items-center justify-between gap-2 text-sm font-medium text-neutral-800">
                  {field.label}
                  {scope === "project" && data.overrides?.[field.key] !== undefined && (
                    <button type="button" onClick={() => inheritField(field.key)} className="text-xs font-semibold text-violet-600">Use tenant default</button>
                  )}
                </span>
                <input
                  value={draft[field.key]}
                  onChange={(event) => updateField(field.key, event.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100"
                />
                <span className="mt-1 block text-xs text-neutral-500">{field.hint}</span>
                {errors[field.key] && <span className="mt-1 block text-xs text-red-600">{errors[field.key]}</span>}
              </label>
            ))}
            <label className="block">
              <span className="flex items-center justify-between gap-2 text-sm font-medium text-neutral-800">
                Primary color
                {scope === "project" && data.overrides?.primaryColor !== undefined && (
                  <button type="button" onClick={() => inheritField("primaryColor")} className="text-xs font-semibold text-violet-600">Use tenant default</button>
                )}
              </span>
              <div className="mt-2 flex gap-2">
                <input type="color" value={draft.primaryColor} onChange={(event) => updateField("primaryColor", event.target.value.toUpperCase())} className="h-10 w-12 rounded border p-1" />
                <input value={draft.primaryColor} onChange={(event) => updateField("primaryColor", event.target.value)} className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm uppercase" />
              </div>
              {errors.primaryColor && <span className="mt-1 block text-xs text-red-600">{errors.primaryColor}</span>}
            </label>
            <label className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-4">
              <span><span className="block text-sm font-medium text-neutral-800">Brand the login page</span><span className="mt-1 block text-xs text-neutral-500">Show this identity before users sign in.</span></span>
              <input type="checkbox" checked={draft.loginBrandingEnabled} onChange={(event) => updateField("loginBrandingEnabled", event.target.checked)} className="h-5 w-5 rounded text-violet-600" />
            </label>
          </div>
          <div className="flex justify-end">
            <button type="button" disabled={patchMutation.isPending} onClick={() => void save()} className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50">
              {patchMutation.isPending ? "Saving…" : "Save branding"}
            </button>
          </div>
        </div>
        <BrandingPreview branding={preview} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <BrandingAssetField label="Primary logo" hint="Header, login, and expanded navigation. PNG, JPEG, or WebP up to 2 MB." slot="logo" stored={data.overrides?.logo} effectiveUrl={data.effective.logoUrl} inherited={scope === "project" && !data.overrides?.logo} busy={uploadMutation.isPending || resetAssetMutation.isPending} onUpload={upload} onReset={resetAsset} />
        <BrandingAssetField label="Compact logo" hint="Collapsed sidebar and compact navigation." slot="compactLogo" stored={data.overrides?.compactLogo} effectiveUrl={data.effective.compactLogoUrl} inherited={scope === "project" && !data.overrides?.compactLogo} busy={uploadMutation.isPending || resetAssetMutation.isPending} onUpload={upload} onReset={resetAsset} />
        <BrandingAssetField label="Favicon" hint="Browser tab icon; a square image works best." slot="favicon" stored={data.overrides?.favicon} effectiveUrl={data.effective.faviconUrl} inherited={scope === "project" && !data.overrides?.favicon} busy={uploadMutation.isPending || resetAssetMutation.isPending} onUpload={upload} onReset={resetAsset} />
      </div>
    </section>
  );
}
