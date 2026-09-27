import { useEffect, useState, type ReactNode } from "react";
import { FiMonitor, FiUser } from "react-icons/fi";
import type { EffectiveBranding } from "../../types/branding";

function SafePreviewImage({
  src,
  alt,
  className,
  fallback,
}: {
  src?: string;
  alt?: string;
  className?: string;
  fallback: ReactNode;
}) {
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || error) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={src}
      alt={alt || ""}
      onError={() => setError(true)}
      className={className}
    />
  );
}

export function BrandingPreview({ branding }: { branding: EffectiveBranding }) {
  const initial = branding.displayName?.charAt(0)?.toUpperCase() || "A";

  const logoFallback = (
    <div
      className="flex h-7 w-7 items-center justify-center rounded-ui-sm text-xs font-bold text-white shadow-sm"
      style={{ backgroundColor: branding.primaryColor }}
    >
      {initial}
    </div>
  );

  const compactLogoFallback = (
    <div
      className="flex h-6 w-6 items-center justify-center rounded-ui-sm text-[11px] font-bold text-white shadow-sm"
      style={{ backgroundColor: branding.primaryColor }}
    >
      {initial}
    </div>
  );

  const faviconFallback = (
    <div
      className="flex h-4 w-4 items-center justify-center rounded-sm text-[9px] font-bold text-white"
      style={{ backgroundColor: branding.primaryColor }}
    >
      {initial}
    </div>
  );

  return (
    <aside
      className="flex flex-col rounded-ui-xl border border-ui-border/60 bg-ui-surface-subtle/30 p-4"
      aria-label="Live branding preview"
    >
      <div className="mb-3.5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-ui-muted">
            <FiMonitor size={14} />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ui-muted">Live preview</h3>
          </div>
          <p className="mt-0.5 text-[11px] text-ui-muted">Identity surfaces in your project</p>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-ui-sm border border-ui-border/60 bg-ui-surface/80 px-2 py-0.5 text-[11px] text-ui-muted"
          title="Browser tab preview"
        >
          <SafePreviewImage
            src={branding.faviconUrl}
            alt=""
            className="h-3.5 w-3.5 object-contain"
            fallback={faviconFallback}
          />
          <span className="max-w-[90px] truncate text-[11px] text-ui-muted">
            {branding.displayName}
          </span>
        </div>
      </div>

      {/* Browser / App Window Mockup */}
      <div className="overflow-hidden rounded-ui-md border border-ui-border/60 bg-ui-surface">
        {/* Browser Top Window Bar */}
        <div className="flex h-7 items-center gap-2 border-b border-ui-border/50 bg-ui-surface-subtle/70 px-2.5">
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-ui-border" />
            <span className="h-1.5 w-1.5 rounded-full bg-ui-border" />
            <span className="h-1.5 w-1.5 rounded-full bg-ui-border" />
          </div>
          <div className="mx-auto flex h-4 w-36 items-center justify-center rounded border border-ui-border/50 bg-ui-surface/60 px-1.5 text-[9px] font-mono text-ui-muted">
            <span className="truncate">app.autoapi.org</span>
          </div>
        </div>

        {/* App Header */}
        <div className="flex h-10 items-center justify-between border-b border-ui-border/50 bg-ui-surface px-3">
          <div className="flex items-center gap-2 min-w-0">
            <SafePreviewImage
              src={branding.logoUrl}
              alt={branding.logoAlt}
              className="h-6 max-w-[80px] object-contain"
              fallback={logoFallback}
            />
            <span className="truncate text-xs font-semibold text-ui-foreground">
              {branding.displayName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-12 rounded-full bg-ui-surface-subtle border border-ui-border/60" />
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ui-surface-subtle border border-ui-border text-[10px] text-ui-muted">
              <FiUser size={11} />
            </div>
          </div>
        </div>

        {/* App Body Preview */}
        <div className="flex min-h-[190px]">
          {/* Sidebar */}
          <div className="flex w-12 flex-col items-center gap-2.5 border-r border-ui-border bg-ui-surface-subtle/50 py-3">
            <SafePreviewImage
              src={branding.compactLogoUrl}
              alt=""
              className="h-5 w-5 object-contain"
              fallback={compactLogoFallback}
            />
            <div className="my-1 w-6 border-b border-ui-border" />
            <div
              className="h-5 w-5 rounded-ui-sm opacity-90 shadow-sm"
              style={{ backgroundColor: branding.primaryColor }}
            />
            <div className="h-5 w-5 rounded-ui-sm bg-ui-border/60" />
            <div className="h-5 w-5 rounded-ui-sm bg-ui-border/40" />
          </div>

          {/* Main Area */}
          <div className="flex flex-1 items-center justify-center p-4 bg-ui-page/50">
            {branding.loginBrandingEnabled ? (
              <div className="w-full max-w-[210px] rounded-ui-lg border border-ui-border bg-ui-surface p-3.5 shadow-sm text-center">
                <div className="mx-auto mb-2 flex justify-center">
                  <SafePreviewImage
                    src={branding.logoUrl}
                    alt=""
                    className="h-7 max-w-[100px] object-contain"
                    fallback={logoFallback}
                  />
                </div>
                <div className="text-xs font-semibold text-ui-foreground truncate">
                  {branding.displayName}
                </div>
                <div className="mt-2.5 space-y-1.5">
                  <div className="h-5 w-full rounded-ui-sm border border-ui-border bg-ui-surface-subtle/70" />
                  <div className="h-5 w-full rounded-ui-sm border border-ui-border bg-ui-surface-subtle/70" />
                  <div
                    className="flex h-6 w-full items-center justify-center rounded-ui-sm text-[10px] font-semibold text-white shadow-sm transition-colors"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    Sign In
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-2.5 p-2">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-20 rounded bg-ui-border/60" />
                  <div
                    className="h-5 rounded-ui-sm px-2 text-[10px] font-medium text-white flex items-center shadow-sm"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    Action
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-12 rounded-ui-md border border-ui-border bg-ui-surface p-2">
                    <div className="h-2 w-10 rounded bg-ui-border/60 mb-1" />
                    <div
                      className="text-xs font-bold"
                      style={{ color: branding.primaryColor }}
                    >
                      1,240
                    </div>
                  </div>
                  <div className="h-12 rounded-ui-md border border-ui-border bg-ui-surface p-2">
                    <div className="h-2 w-10 rounded bg-ui-border/60 mb-1" />
                    <div className="text-xs font-bold text-ui-foreground">98.2%</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
