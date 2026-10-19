import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiCompass } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/User.context";

export function NotFoundPage() {
  const { t } = useTranslation();
  const { user } = useUserContext();
  return (
    <div className="flex min-h-full items-center justify-center px-6 py-16 text-center">
      <div className="max-w-md">
        <div aria-hidden="true" className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-ui-border bg-ui-surface text-ui-primary shadow-ui-sm"><FiCompass size={28} /></div>
        <p className="text-xs font-semibold uppercase tracking-widest text-ui-muted">404</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ui-foreground">{t("Page not found")}</h1>
        <p className="mt-3 text-sm leading-6 text-ui-muted">{t("This page may have moved, or the address may be incorrect. You can return to your workspace and continue from there.")}</p>
        <Link to={user ? "/dashboard" : "/login"} className="ui-focus-ring mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-ui-md bg-ui-primary px-4 py-2 text-sm font-medium text-white hover:bg-ui-primary-hover"><FiArrowLeft aria-hidden="true" />{user ? t("Back to dashboard") : t("Go to sign in")}</Link>
      </div>
    </div>
  );
}
