import { useTranslation } from "react-i18next";
import { PageShell, Skeleton } from "../components/ui";

export function RouteLoading() {
  const { t } = useTranslation();
  return <PageShell><div role="status" aria-label={t("Loading page")} className="space-y-6"><span className="sr-only">{t("Loading page…")}</span><div className="space-y-3 border-b border-ui-border pb-6"><Skeleton className="h-7 w-40" /><Skeleton className="h-4 w-2/3 max-w-md" /></div><div className="grid gap-4 md:grid-cols-2"><Skeleton className="h-48" /><Skeleton className="h-48" /></div></div></PageShell>;
}
