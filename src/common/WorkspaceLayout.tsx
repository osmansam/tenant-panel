import { useEffect, useRef, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { Button } from "../components/ui";
import { useGeneralContext } from "../context/General.context";

export function WorkspaceLayout({ children, sidebar }: { children: ReactNode; sidebar?: ReactNode }) {
  const { t } = useTranslation();
  const { isSidebarOpen, setIsSidebarOpen } = useGeneralContext();
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    mainRef.current?.scrollTo?.(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="flex h-dvh min-h-0 bg-ui-page font-ui text-ui-foreground">
      <a href="#main-content" className="ui-focus-ring fixed left-4 top-4 z-[100] -translate-y-24 rounded-ui-md bg-ui-ink px-4 py-3 text-sm font-medium text-white shadow-ui-button focus:translate-y-0">
        {t("Skip to content")}
      </a>
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-ui-border/70 bg-ui-surface/80 px-4 backdrop-blur-xl md:hidden">
          <Button type="button" variant="icon" aria-label={t("Open navigation")} aria-controls="main-navigation" aria-expanded={isSidebarOpen} onClick={() => setIsSidebarOpen(true)}>
            <FiMenu size={20} aria-hidden="true" />
          </Button>
          <span className="text-[15px] font-semibold tracking-tight">Tenant Panel</span>
        </header>
        <main ref={mainRef} id="main-content" tabIndex={-1} className="ui-canvas min-h-0 min-w-0 flex-1 overflow-auto overscroll-contain outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
