import { useTranslation } from "react-i18next";
import { FiCopy, FiTerminal } from "react-icons/fi";
import { toast } from "react-toastify";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import { useTenant } from "../../../hooks/useTenant";
import type { Field, Routes } from "../../../utils/api/container";
import {
  buildEndpointRequestUrl,
  getApiBaseUrl,
  getContainerRouteEndpoints,
} from "../../../utils/containerRouteEndpoints";
import { getHttpMethodBadgeTreatment } from "../../integrations/http-method-badge";
import { Badge } from "../../ui";

export interface ContainerApiReferenceProps {
  schemaName: string;
  routes: Routes | undefined;
  fields?: Field[];
}

interface ExampleBlockProps {
  label: string;
  ariaLabel: string;
  copyLabel: string;
  value: string;
  onCopy: (value: string) => void;
}

const ExampleBlock: React.FC<ExampleBlockProps> = ({
  label,
  ariaLabel,
  copyLabel,
  value,
  onCopy,
}) => (
  <div className="mt-3 overflow-hidden rounded-ui-md border border-ui-border">
    <div className="flex items-center justify-between gap-3 border-b border-ui-border bg-ui-surface-subtle px-3 py-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-ui-muted">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onCopy(value)}
        aria-label={copyLabel}
        title={copyLabel}
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-ui-xs text-ui-muted transition-colors hover:bg-ui-surface hover:text-ui-foreground"
      >
        <FiCopy size={12} />
      </button>
    </div>
    <pre
      aria-label={ariaLabel}
      className="max-h-72 overflow-auto bg-ui-ink p-3 font-mono text-[11px] leading-5 text-[hsl(var(--ui-ink-foreground))]"
    >
      {value}
    </pre>
  </div>
);

const ContainerApiReference: React.FC<ContainerApiReferenceProps> = ({
  schemaName,
  routes,
  fields = [],
}) => {
  const { t } = useTranslation();
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();
  const tenantSlug = currentTenant?.slug ?? "";
  const projectSlug = currentProject?.slug ?? "";
  const endpoints = getContainerRouteEndpoints(routes, schemaName, fields);
  const baseUrl = getApiBaseUrl(tenantSlug, projectSlug);

  const copyValue = (value: string) => {
    void navigator.clipboard?.writeText(value);
    toast.success(t("Copied to clipboard"));
  };

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-ui-xl border border-ui-border bg-ui-surface shadow-ui-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ui-border px-4 py-3.5 sm:px-5">
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-ui-foreground">
              {t("API Reference")}
            </h4>
            <p className="mt-0.5 text-xs text-ui-muted">
              {t("Exact request paths for this collection's routes.")}
            </p>
          </div>
          <div className="flex min-w-0 items-center gap-2 rounded-ui-md border border-ui-border bg-ui-surface-subtle px-3 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ui-muted">
              {t("Base URL")}
            </span>
            <code className="truncate font-mono text-xs text-ui-foreground">
              {baseUrl}
            </code>
            <button
              type="button"
              onClick={() => copyValue(baseUrl)}
              aria-label={t("Copy base URL")}
              title={t("Copy base URL")}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-ui-xs text-ui-muted transition-colors hover:text-ui-foreground"
            >
              <FiCopy size={12} />
            </button>
          </div>
        </div>

        {endpoints.length > 0 ? (
          <div className="divide-y divide-ui-border/70">
            {endpoints.map((endpoint) => (
              <article
                key={endpoint.routeName}
                aria-label={endpoint.routeName}
                className="px-4 py-4 transition-colors hover:bg-ui-surface-subtle/40 sm:px-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                    <Badge {...getHttpMethodBadgeTreatment(endpoint.method)}>
                      {endpoint.method}
                    </Badge>
                    <code className="break-all font-mono text-xs text-ui-foreground">
                      {endpoint.path}
                    </code>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                    {endpoint.isAuthenticated && (
                      <Badge variant="info">{t("Auth required")}</Badge>
                    )}
                    {endpoint.isAuthorized && (
                      <Badge variant="warning">
                        {endpoint.authorizeRole.length > 0
                          ? endpoint.authorizeRole.join(", ")
                          : t("Authorized")}
                      </Badge>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        copyValue(
                          buildEndpointRequestUrl(
                            endpoint.path,
                            tenantSlug,
                            projectSlug,
                          ),
                        )
                      }
                      aria-label={t("Copy {{method}} {{path}}", {
                        method: endpoint.method,
                        path: endpoint.path,
                      })}
                      title={t("Copy request URL")}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-ui-sm border border-ui-border bg-ui-surface text-ui-muted transition-colors hover:bg-ui-surface-subtle hover:text-ui-foreground"
                    >
                      <FiCopy size={12} />
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-sm font-medium text-ui-foreground">
                  {t(endpoint.summary)}
                </p>
                {endpoint.description && (
                  <p className="mt-0.5 text-xs text-ui-muted">
                    {t(endpoint.description)}
                  </p>
                )}

                {(endpoint.params.length > 0 || endpoint.body) && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    {endpoint.params.map((param) => (
                      <span
                        key={`${param.location}-${param.name}`}
                        className="inline-flex items-center gap-1.5 rounded-ui-xs border border-ui-border bg-ui-surface-subtle px-1.5 py-0.5 font-mono text-[11px] text-ui-muted"
                      >
                        {param.name}
                        <span className="text-ui-placeholder">
                          {param.location}
                        </span>
                        {param.required && (
                          <span
                            className="text-ui-danger"
                            title={t("Required")}
                            aria-label={t("Required")}
                          >
                            *
                          </span>
                        )}
                      </span>
                    ))}
                    {endpoint.body && (
                      <span className="text-[11px] text-ui-muted">
                        {t("Body")}: {t(endpoint.body)}
                      </span>
                    )}
                  </div>
                )}

                {endpoint.exampleBody && (
                  <ExampleBlock
                    label={t("Example payload")}
                    ariaLabel={t("Example payload for {{route}}", {
                      route: endpoint.summary,
                    })}
                    copyLabel={t("Copy example payload")}
                    value={endpoint.exampleBody}
                    onCopy={copyValue}
                  />
                )}

                {endpoint.exampleResponse && (
                  <ExampleBlock
                    label={t("Example response")}
                    ariaLabel={t("Example response for {{route}}", {
                      route: endpoint.summary,
                    })}
                    copyLabel={t("Copy example response")}
                    value={endpoint.exampleResponse}
                    onCopy={copyValue}
                  />
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ui-surface-muted text-ui-muted">
              <FiTerminal size={20} />
            </span>
            <p className="text-sm font-medium text-ui-foreground">
              {t("No routes configured for this collection")}
            </p>
            <p className="text-xs text-ui-muted">
              {t("Enable routes from the Routes tab to see their request paths here.")}
            </p>
          </div>
        )}
      </section>

      <p className="text-xs text-ui-muted">
        {t(
          "Paths are relative to the API base URL. Replace path placeholders with real values before sending a request.",
        )}
      </p>
    </div>
  );
};

export default ContainerApiReference;
