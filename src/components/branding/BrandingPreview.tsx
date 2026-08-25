import type { EffectiveBranding } from "../../types/branding";

export function BrandingPreview({ branding }: { branding: EffectiveBranding }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-neutral-900">Live preview</h3>
          <p className="text-xs text-neutral-500">Identity surfaces in your project</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white p-1.5" title="Browser favicon">
          <img src={branding.faviconUrl} alt="" className="max-h-full max-w-full object-contain" />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex h-14 items-center gap-3 border-b px-4">
          <img src={branding.logoUrl} alt="" className="h-8 w-8 object-contain" />
          <span className="text-sm font-semibold">{branding.displayName}</span>
          <span className="ml-auto h-2 w-20 rounded-full bg-neutral-100" />
        </div>
        <div className="flex min-h-36">
          <div className="w-16 border-r bg-neutral-50 p-3">
            <img src={branding.compactLogoUrl} alt="" className="mx-auto h-8 w-8 object-contain" />
          </div>
          <div className="flex flex-1 items-center justify-center p-5">
            <div className="w-full max-w-52 rounded-xl border p-4 text-center shadow-sm">
              <img src={branding.logoUrl} alt="" className="mx-auto h-10 max-w-32 object-contain" />
              <p className="mt-2 text-sm font-semibold">{branding.displayName}</p>
              <div className="mt-3 h-7 rounded-md" style={{ backgroundColor: branding.primaryColor }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
