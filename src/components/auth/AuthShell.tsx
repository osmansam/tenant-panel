import type { ReactNode } from "react";

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ui-page px-4 py-10 font-ui sm:px-6 sm:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-240px] h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(0_113_227/0.10),transparent)] blur-2xl" />
        <div className="absolute bottom-[-280px] right-[-140px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(120_120_128/0.14),transparent)] blur-2xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[400px]">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-[15px] bg-ui-ink shadow-ui-button" aria-hidden="true">
            <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="mt-5 text-[26px] font-semibold leading-tight tracking-[-0.03em] text-ui-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-sm text-sm leading-6 text-ui-muted">{subtitle}</p>
          )}
        </div>

        <div className="mt-7 animate-fade-up rounded-ui-2xl border border-ui-border/80 bg-ui-surface/90 p-6 shadow-ui-dialog backdrop-blur-xl sm:p-8">
          {children}
        </div>

        {footer && (
          <div className="mt-6 text-center text-xs leading-5 text-ui-muted">
            {footer}
          </div>
        )}
      </div>
    </main>
  );
}
