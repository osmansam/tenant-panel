import { Component, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FiAlertCircle } from "react-icons/fi";
import { Button, PageShell } from "../components/ui";

function PageError({ onRetry, requiresReload }: { onRetry: () => void; requiresReload: boolean }) {
  const { t } = useTranslation();
  return (
    <PageShell>
      <div role="alert" className="mx-auto my-12 max-w-lg rounded-ui-lg border border-ui-border bg-ui-surface p-8 text-center shadow-ui-sm">
        <FiAlertCircle aria-hidden="true" className="mx-auto mb-4 size-8 text-ui-warning" />
        <h1 className="text-xl font-semibold tracking-tight">{t("This page could not be displayed")}</h1>
        <p className="mt-2 text-sm leading-6 text-ui-muted">{t("Try opening it again. You can also choose another page from the navigation.")}</p>
        <Button type="button" onClick={onRetry} className="mt-5">{requiresReload ? t("Reload page") : t("Try again")}</Button>
      </div>
    </PageShell>
  );
}

export class RouteErrorBoundary extends Component<
  { resetKey: string; children: ReactNode; fallback?: (retry: () => void, requiresReload: boolean) => ReactNode },
  { failed: boolean; requiresReload: boolean }
> {
  state = { failed: false, requiresReload: false };
  static getDerivedStateFromError(error: unknown) {
    const message = error instanceof Error ? error.message : "";
    return { failed: true, requiresReload: /Unable to preload CSS|Failed to fetch dynamically imported module|Importing a module script failed|Loading chunk .+ failed|error loading dynamically imported module/i.test(message) };
  }
  retry = () => {
    if (this.state.requiresReload) window.location.reload();
    else this.setState({ failed: false });
  };
  componentDidUpdate(previous: { resetKey: string }) {
    if (previous.resetKey !== this.props.resetKey && this.state.failed) this.setState({ failed: false });
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return this.props.fallback?.(this.retry, this.state.requiresReload) ?? <PageError onRetry={this.retry} requiresReload={this.state.requiresReload} />;
  }
}
