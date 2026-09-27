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
import { GenericButton } from "../panelComponents/FormElements/GenericButton";
import { EmptyState, Section, SectionHeader, Switch } from "../ui";
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
    return <div role="alert" className="rounded-ui-lg border border-ui-danger/30 bg-ui-danger-subtle p-5 text-sm text-ui-danger">Branding settings could not be loaded.</div>;
  }
  if (query.isLoading || !draft || !data || !preview) {
    return <EmptyState title="Loading branding…" />;
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
    <section className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">
        <Section surface="outlined" className="space-y-6 rounded-ui-xl p-6 shadow-ui-sm">
          <SectionHeader
            title={scope === "tenant" ? "Tenant branding" : "Project branding"}
            description={scope === "tenant" ? "Defaults used by every project in this tenant." : "Override tenant defaults only where this project needs a different identity."}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {scalarFields.map((field) => {
              const inputId = `branding-${field.key}`;
              const descriptionId = `${inputId}-description`;
              return (
              <div key={field.key} className="min-w-0">
                <span className="flex items-center justify-between gap-2 text-sm font-medium text-ui-foreground">
                  <label htmlFor={inputId}>{field.label}</label>
                  {scope === "project" && data.overrides?.[field.key] !== undefined && (
                    <button type="button" onClick={() => inheritField(field.key)} className="text-xs font-medium text-ui-primary hover:underline">Use tenant default</button>
                  )}
                </span>
                <input
                  id={inputId}
                  aria-describedby={descriptionId}
                  value={draft[field.key]}
                  onChange={(event) => updateField(field.key, event.target.value)}
                  className="ui-control mt-2 min-w-0 w-full"
                />
                <span id={descriptionId} className="mt-1.5 block text-xs text-ui-muted">{field.hint}</span>
                {errors[field.key] && <span className="mt-1 block text-xs text-ui-danger">{errors[field.key]}</span>}
              </div>
            )})}
            <div className="block min-w-0">
              <span className="flex items-center justify-between gap-2 text-sm font-medium text-ui-foreground">
                <label htmlFor="branding-primary-color">Primary color</label>
                {scope === "project" && data.overrides?.primaryColor !== undefined && (
                  <button type="button" onClick={() => inheritField("primaryColor")} className="text-xs font-medium text-ui-primary hover:underline">Use tenant default</button>
                )}
              </span>
              <div className="mt-2 flex items-center gap-2.5">
                <label className="relative flex h-10 w-11 shrink-0 cursor-pointer items-center justify-center rounded-ui-md border border-ui-border shadow-sm overflow-hidden transition-all hover:scale-105" title="Pick color">
                  <span className="absolute inset-0" style={{ backgroundColor: draft.primaryColor }} />
                  <input
                    type="color"
                    value={draft.primaryColor}
                    onChange={(event) => updateField("primaryColor", event.target.value.toUpperCase())}
                    className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                  />
                </label>
                <input
                  id="branding-primary-color"
                  aria-invalid={Boolean(errors.primaryColor)}
                  aria-describedby={errors.primaryColor ? "branding-primary-color-error" : undefined}
                  value={draft.primaryColor}
                  onChange={(event) => updateField("primaryColor", event.target.value)}
                  className="ui-control min-w-0 flex-1 font-mono text-sm uppercase"
                  placeholder="#000000"
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-ui-muted mr-1">Presets:</span>
                {["#2563EB", "#7C3AED", "#059669", "#D97706", "#DC2626", "#0F172A"].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => updateField("primaryColor", preset)}
                    title={preset}
                    aria-label={`Select ${preset}`}
                    className="h-4 w-4 rounded-full border border-ui-border/60 transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus"
                    style={{ backgroundColor: preset }}
                  />
                ))}
              </div>
              {errors.primaryColor && <span id="branding-primary-color-error" className="mt-1 block text-xs text-ui-danger">{errors.primaryColor}</span>}
            </div>
            <div className="pt-1">
              <Switch checked={draft.loginBrandingEnabled} onCheckedChange={(checked) => updateField("loginBrandingEnabled", checked)} label="Brand the login page" description="Show this identity before users sign in." />
            </div>
          </div>
          <div className="flex justify-end border-t border-ui-border pt-4">
            <GenericButton variant="primary" disabled={patchMutation.isPending} onClick={() => void save()}>
              {patchMutation.isPending ? "Saving…" : "Save branding"}
            </GenericButton>
          </div>
        </Section>
        <BrandingPreview branding={preview} />
      </div>

      <div>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-ui-foreground">Brand Assets</h3>
          <p className="text-xs text-ui-muted">Upload customized logos and icons used across your navigation and browser chrome.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <BrandingAssetField label="Primary logo" hint="Header, login, and expanded navigation. PNG, JPEG, or WebP up to 2 MB." slot="logo" stored={data.overrides?.logo} effectiveUrl={data.effective.logoUrl} inherited={scope === "project" && !data.overrides?.logo} busy={uploadMutation.isPending || resetAssetMutation.isPending} onUpload={upload} onReset={resetAsset} />
          <BrandingAssetField label="Compact logo" hint="Collapsed sidebar and compact navigation." slot="compactLogo" stored={data.overrides?.compactLogo} effectiveUrl={data.effective.compactLogoUrl} inherited={scope === "project" && !data.overrides?.compactLogo} busy={uploadMutation.isPending || resetAssetMutation.isPending} onUpload={upload} onReset={resetAsset} />
          <BrandingAssetField label="Favicon" hint="Browser tab icon; a square image works best." slot="favicon" stored={data.overrides?.favicon} effectiveUrl={data.effective.faviconUrl} inherited={scope === "project" && !data.overrides?.favicon} busy={uploadMutation.isPending || resetAssetMutation.isPending} onUpload={upload} onReset={resetAsset} />
        </div>
      </div>
    </section>
  );
}
