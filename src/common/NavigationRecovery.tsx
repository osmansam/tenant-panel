import { useTranslation } from "react-i18next";
import { FiAlertCircle } from "react-icons/fi";
import { Button } from "../components/ui";

export function NavigationRecovery({ onRetry, requiresReload }: { onRetry: () => void; requiresReload: boolean }) {
  const { t } = useTranslation();
  return (
    <aside role="alert" className="fixed inset-x-4 top-16 z-40 rounded-ui-lg border border-ui-border bg-ui-surface p-5 shadow-ui-sm md:static md:w-64 md:shrink-0 md:rounded-none md:border-y-0 md:border-l-0 md:shadow-none">
      <FiAlertCircle aria-hidden="true" className="mb-3 size-5 text-ui-warning" />
      <h2 className="text-sm font-semibold">{t("Navigation could not be loaded")}</h2>
      <p className="mt-2 text-xs leading-5 text-ui-muted">{t("Your current page is still available. Reload to restore navigation.")}</p>
      <Button type="button" size="sm" variant="outline" onClick={onRetry} className="mt-4">{requiresReload ? t("Reload page") : t("Try again")}</Button>
    </aside>
  );
}
