import React, { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiCopy,
  FiKey,
  FiPlus,
  FiRefreshCw,
  FiShield,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { GenericButton } from "../components/panelComponents/FormElements/GenericButton";
import { useCurrentProject } from "../hooks/useCurrentProject";
import {
  ContainerModel,
  useContainers,
} from "../utils/api/container";
import {
  ExternalAPICredential,
  ExternalAPIAuthType,
  IntegrationCredential,
  IntegrationPermission,
  IntegrationPermissionKind,
  normalizeExternalAPICredentialPayload,
  useCreateExternalAPICredential,
  useCreateIntegrationCredential,
  useExternalAPICredentials,
  useIntegrationCredentials,
  useRevokeExternalAPICredential,
  useRevokeIntegrationCredential,
} from "../utils/api/integration";

const permissionKinds: { value: IntegrationPermissionKind; label: string }[] = [
  { value: "dynamicRoute", label: "Dynamic route" },
  { value: "workflow", label: "Workflow" },
  { value: "api", label: "Dynamic API" },
  { value: "pipeline", label: "Pipeline" },
];

const methods = ["GET", "POST", "PATCH", "PUT", "DELETE"];

const dynamicRoutes = [
  { route: "CreateDynamicModelItem", method: "POST" },
  { route: "CreateMultipleDynamicModelItem", method: "POST" },
  { route: "GetAllDynamicModelItems", method: "GET" },
  { route: "GetAllDynamicModelItemsWithPagination", method: "GET" },
  { route: "GetDynamicModelItem", method: "GET" },
  { route: "UpdateDynamicModelItem", method: "PATCH" },
  { route: "UpdateMultipleDynamicModelItem", method: "PATCH" },
  { route: "DeleteDynamicModelItem", method: "DELETE" },
  { route: "DeleteMultipleDynamicModelItem", method: "DELETE" },
  { route: "HandleSearchDynamicModelItem", method: "GET" },
  { route: "HandleFilterDynamicModelItem", method: "GET" },
  { route: "ExportDynamicModelItems", method: "POST" },
  { route: "GetItemsForSelection", method: "GET" },
  { route: "TestPipeline", method: "GET" },
];

const emptyPermission = (): IntegrationPermission => ({
  kind: "workflow",
  schemaName: "",
  name: "",
  method: "POST",
});

function defaultExpiration() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

function toApiDate(localDateTime: string) {
  return new Date(localDateTime).toISOString();
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getCredentialStatus(credential: IntegrationCredential) {
  if (credential.revokedAt) {
    return { label: "Revoked", className: "bg-red-50 text-red-700" };
  }
  if (new Date(credential.expiresAt).getTime() <= Date.now()) {
    return { label: "Expired", className: "bg-amber-50 text-amber-700" };
  }
  return { label: "Active", className: "bg-emerald-50 text-emerald-700" };
}

function getExternalCredentialStatus(credential: ExternalAPICredential) {
  if (credential.revokedAt) {
    return { label: "Revoked", className: "bg-red-50 text-red-700" };
  }
  if (
    credential.expiresAt &&
    new Date(credential.expiresAt).getTime() <= Date.now()
  ) {
    return { label: "Expired", className: "bg-amber-50 text-amber-700" };
  }
  return { label: "Active", className: "bg-emerald-50 text-emerald-700" };
}

function getPermissionName(permission: IntegrationPermission) {
  return permission.kind === "dynamicRoute"
    ? permission.route || ""
    : permission.name || "";
}

function optionsForKind(
  kind: IntegrationPermissionKind,
  schemaName: string,
  containers: ContainerModel[]
) {
  const container = containers.find((item) => item.schemaName === schemaName);
  if (!container) return [];

  if (kind === "workflow") {
    return (container.workflows || []).map((item: any) => item.name);
  }
  if (kind === "api") {
    return (container.dynamicApis || []).map((item: any) => item.name);
  }
  if (kind === "pipeline") {
    return (container.pipelines || []).map((item: any) => item.name);
  }
  return dynamicRoutes.map((item) => item.route);
}

const IntegrationsContent: React.FC<{ currentProject: { name: string } }> = ({
  currentProject,
}) => {
  const containers = useContainers(true);
  const { data: credentials = [], isLoading, refetch } =
    useIntegrationCredentials(true);
  const {
    data: externalCredentials = [],
    isLoading: externalCredentialsLoading,
    refetch: refetchExternalCredentials,
  } = useExternalAPICredentials(true);
  const createCredential = useCreateIntegrationCredential();
  const revokeCredential = useRevokeIntegrationCredential();
  const createExternalCredential = useCreateExternalAPICredential();
  const revokeExternalCredential = useRevokeExternalAPICredential();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isExternalCreateOpen, setIsExternalCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [expiresAt, setExpiresAt] = useState(defaultExpiration());
  const [permissions, setPermissions] = useState<IntegrationPermission[]>([
    emptyPermission(),
  ]);
  const [createdToken, setCreatedToken] = useState<string | null>(null);
  const [externalName, setExternalName] = useState("");
  const [externalAuthType, setExternalAuthType] =
    useState<ExternalAPIAuthType>("bearer");
  const [externalHeaderName, setExternalHeaderName] = useState("");
  const [externalSecret, setExternalSecret] = useState("");
  const [externalAllowedDomains, setExternalAllowedDomains] = useState("");
  const [externalExpiresAt, setExternalExpiresAt] = useState("");

  const schemaNames = useMemo(
    () => containers.map((container) => container.schemaName).filter(Boolean),
    [containers]
  );
  const resetForm = () => {
    setName("");
    setExpiresAt(defaultExpiration());
    setPermissions([emptyPermission()]);
  };

  const resetExternalForm = () => {
    setExternalName("");
    setExternalAuthType("bearer");
    setExternalHeaderName("");
    setExternalSecret("");
    setExternalAllowedDomains("");
    setExternalExpiresAt("");
  };

  const updatePermission = (
    index: number,
    patch: Partial<IntegrationPermission>
  ) => {
    setPermissions((current) =>
      current.map((permission, permissionIndex) => {
        if (permissionIndex !== index) return permission;
        const next = { ...permission, ...patch };

        if (patch.kind) {
          next.route = patch.kind === "dynamicRoute" ? "" : undefined;
          next.name = patch.kind === "dynamicRoute" ? undefined : "";
          next.method = patch.kind === "dynamicRoute" ? "GET" : "POST";
        }

        if (patch.schemaName !== undefined) {
          next.route = next.kind === "dynamicRoute" ? "" : undefined;
          next.name = next.kind === "dynamicRoute" ? undefined : "";
        }

        if (next.kind === "dynamicRoute" && patch.route) {
          const route = dynamicRoutes.find((item) => item.route === patch.route);
          if (route) next.method = route.method;
        }

        return next;
      })
    );
  };

  const addPermission = () => {
    setPermissions((current) => [...current, emptyPermission()]);
  };

  const removePermission = (index: number) => {
    setPermissions((current) =>
      current.length === 1
        ? current
        : current.filter((_, permissionIndex) => permissionIndex !== index)
    );
  };

  const submitCreate = async () => {
    const normalized = permissions.map((permission) => ({
      kind: permission.kind,
      schemaName: permission.schemaName.trim(),
      method: permission.method,
      ...(permission.kind === "dynamicRoute"
        ? { route: permission.route?.trim() || "" }
        : { name: permission.name?.trim() || "" }),
    }));

    if (!name.trim()) {
      toast.error("Credential name is required");
      return;
    }
    if (
      normalized.some(
        (permission) =>
          !permission.schemaName ||
          !permission.method ||
          (permission.kind === "dynamicRoute"
            ? !(permission as IntegrationPermission).route
            : !(permission as IntegrationPermission).name)
      )
    ) {
      toast.error("Complete every permission row");
      return;
    }

    try {
      const result = await createCredential.mutateAsync({
        name: name.trim(),
        expiresAt: toApiDate(expiresAt),
        permissions: normalized,
      });
      setCreatedToken(result.token);
      resetForm();
      setIsCreateOpen(false);
    } catch {
      // Toast handled by mutation.
    }
  };

  const submitExternalCreate = async () => {
    const payload = normalizeExternalAPICredentialPayload({
      name: externalName,
      authType: externalAuthType,
      headerName: externalHeaderName,
      secret: externalSecret,
      allowedDomains: externalAllowedDomains,
      expiresAt: externalExpiresAt,
    });

    if (!payload.name) {
      toast.error("Credential name is required");
      return;
    }
    if (!payload.secret) {
      toast.error("External API token is required");
      return;
    }
    if (payload.authType === "header" && !payload.headerName) {
      toast.error("Header name is required for custom header auth");
      return;
    }
    if (payload.allowedDomains.length === 0) {
      toast.error("Allowed domain is required");
      return;
    }

    try {
      await createExternalCredential.mutateAsync(payload);
      resetExternalForm();
      setIsExternalCreateOpen(false);
    } catch {
      // Toast handled by mutation.
    }
  };

  const copyToken = async () => {
    if (!createdToken) return;
    await navigator.clipboard.writeText(createdToken);
    toast.success("Token copied");
  };

  const revoke = (credential: IntegrationCredential) => {
    if (credential.revokedAt) return;
    if (!window.confirm(`Revoke ${credential.name}?`)) return;
    revokeCredential.mutate(credential.id);
  };

  const revokeExternal = (credential: ExternalAPICredential) => {
    if (credential.revokedAt) return;
    if (!window.confirm(`Revoke ${credential.name}?`)) return;
    revokeExternalCredential.mutate(credential.id);
  };

  const copyCredentialId = async (credentialId: string) => {
    await navigator.clipboard.writeText(credentialId);
    toast.success("Credential id copied");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="sticky top-0 z-10 border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-white">
                <FiShield className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-neutral-900">
                  Integrations
                </h1>
                <p className="text-xs text-neutral-500">{currentProject.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  refetch();
                  refetchExternalCredentials();
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                title="Refresh"
              >
                <FiRefreshCw className="h-4 w-4" />
              </button>
              <GenericButton
                onClick={() => setIsExternalCreateOpen(true)}
                variant="secondary"
                size="md"
                iconLeft={<FiPlus className="h-4 w-4" />}
              >
                New external API credential
              </GenericButton>
              <GenericButton
                onClick={() => setIsCreateOpen(true)}
                variant="primary"
                size="md"
                iconLeft={<FiPlus className="h-4 w-4" />}
              >
                New credential
              </GenericButton>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-8 lg:px-12 py-8 space-y-6">
        {createdToken && (
          <section className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-amber-900">
                  New token
                </div>
                <div className="mt-2 flex items-center gap-2 rounded-md border border-amber-200 bg-white px-3 py-2">
                  <code className="min-w-0 flex-1 truncate text-xs text-neutral-800">
                    {createdToken}
                  </code>
                  <button
                    type="button"
                    onClick={copyToken}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100"
                    title="Copy token"
                  >
                    <FiCopy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCreatedToken(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-amber-800 hover:bg-amber-100"
                title="Dismiss"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {isCreateOpen && (
          <section className="rounded-lg border border-neutral-200 bg-white">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">
                  Create integration credential
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  The token is shown once after creation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100"
                title="Close"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-5 p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-medium text-neutral-700">
                    Name
                  </span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-1 h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
                    placeholder="Retailer backend"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-neutral-700">
                    Expires at
                  </span>
                  <input
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(event) => setExpiresAt(event.target.value)}
                    className="mt-1 h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
                  />
                </label>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Permissions
                  </h3>
                  <button
                    type="button"
                    onClick={addPermission}
                    className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    <FiPlus className="h-3.5 w-3.5" />
                    Add permission
                  </button>
                </div>

                {permissions.map((permission, index) => {
                  const availableNames = optionsForKind(
                    permission.kind,
                    permission.schemaName,
                    containers
                  );
                  return (
                    <div
                      key={index}
                      className="grid gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 md:grid-cols-[1.1fr_1fr_1.4fr_.7fr_auto]"
                    >
                      <select
                        value={permission.kind}
                        onChange={(event) =>
                          updatePermission(index, {
                            kind: event.target.value as IntegrationPermissionKind,
                          })
                        }
                        className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-900"
                      >
                        {permissionKinds.map((kind) => (
                          <option key={kind.value} value={kind.value}>
                            {kind.label}
                          </option>
                        ))}
                      </select>

                      <select
                        value={permission.schemaName}
                        onChange={(event) =>
                          updatePermission(index, {
                            schemaName: event.target.value,
                          })
                        }
                        className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-900"
                      >
                        <option value="">Schema</option>
                        {schemaNames.map((schemaName) => (
                          <option key={schemaName} value={schemaName}>
                            {schemaName}
                          </option>
                        ))}
                      </select>

                      {permission.kind === "dynamicRoute" ? (
                        <select
                          value={permission.route || ""}
                          onChange={(event) =>
                            updatePermission(index, {
                              route: event.target.value,
                            })
                          }
                          className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-900"
                        >
                          <option value="">Route</option>
                          {availableNames.map((routeName) => (
                            <option key={routeName} value={routeName}>
                              {routeName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          value={permission.name || ""}
                          onChange={(event) =>
                            updatePermission(index, {
                              name: event.target.value,
                            })
                          }
                          list={`permission-options-${index}`}
                          className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-900"
                          placeholder={`${permission.kind} name`}
                        />
                      )}
                      {permission.kind !== "dynamicRoute" && (
                        <datalist id={`permission-options-${index}`}>
                          {availableNames.map((nameOption) => (
                            <option key={nameOption} value={nameOption} />
                          ))}
                        </datalist>
                      )}

                      <select
                        value={permission.method}
                        onChange={(event) =>
                          updatePermission(index, {
                            method: event.target.value,
                          })
                        }
                        className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-900"
                      >
                        {methods.map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => removePermission(index)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-neutral-500 hover:bg-white hover:text-red-600"
                        title="Remove permission"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-2 border-t border-neutral-200 pt-4">
                <GenericButton
                  onClick={() => setIsCreateOpen(false)}
                  variant="secondary"
                  size="md"
                >
                  Cancel
                </GenericButton>
                <GenericButton
                  onClick={submitCreate}
                  variant="primary"
                  size="md"
                  disabled={createCredential.isPending}
                  iconLeft={<FiKey className="h-4 w-4" />}
                >
                  Create credential
                </GenericButton>
              </div>
            </div>
          </section>
        )}

        {isExternalCreateOpen && (
          <section className="rounded-lg border border-neutral-200 bg-white">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">
                  Create external API credential
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  Paste the token given by another backend. Saved tokens are encrypted and never shown again.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsExternalCreateOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100"
                title="Close"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-5 p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-medium text-neutral-700">
                    Name
                  </span>
                  <input
                    value={externalName}
                    onChange={(event) => setExternalName(event.target.value)}
                    className="mt-1 h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
                    placeholder="Davinci Staging"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-medium text-neutral-700">
                    Auth type
                  </span>
                  <select
                    value={externalAuthType}
                    onChange={(event) =>
                      setExternalAuthType(event.target.value as ExternalAPIAuthType)
                    }
                    className="mt-1 h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-900"
                  >
                    <option value="bearer">Bearer token</option>
                    <option value="header">Custom header</option>
                  </select>
                </label>

                {externalAuthType === "header" && (
                  <label className="block">
                    <span className="text-xs font-medium text-neutral-700">
                      Header name
                    </span>
                    <input
                      value={externalHeaderName}
                      onChange={(event) =>
                        setExternalHeaderName(event.target.value)
                      }
                      className="mt-1 h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
                      placeholder="X-API-Key"
                    />
                  </label>
                )}

                <label className="block">
                  <span className="text-xs font-medium text-neutral-700">
                    Allowed domain
                  </span>
                  <input
                    value={externalAllowedDomains}
                    onChange={(event) =>
                      setExternalAllowedDomains(event.target.value)
                    }
                    className="mt-1 h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
                    placeholder="api-staging.davinciboardgame.com"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="text-xs font-medium text-neutral-700">
                    External API token
                  </span>
                  <input
                    type="password"
                    value={externalSecret}
                    onChange={(event) => setExternalSecret(event.target.value)}
                    className="mt-1 h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
                    placeholder="Token from Davinci or another backend"
                    autoComplete="off"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-medium text-neutral-700">
                    Expires at
                  </span>
                  <input
                    type="datetime-local"
                    value={externalExpiresAt}
                    onChange={(event) =>
                      setExternalExpiresAt(event.target.value)
                    }
                    className="mt-1 h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-2 border-t border-neutral-200 pt-4">
                <GenericButton
                  onClick={() => setIsExternalCreateOpen(false)}
                  variant="secondary"
                  size="md"
                >
                  Cancel
                </GenericButton>
                <GenericButton
                  onClick={submitExternalCreate}
                  variant="primary"
                  size="md"
                  disabled={createExternalCredential.isPending}
                  iconLeft={<FiKey className="h-4 w-4" />}
                >
                  Create external credential
                </GenericButton>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-lg border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-neutral-900">
              External API credentials
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              Tokens from other backends used by workflow call_api steps.
            </p>
          </div>

          {externalCredentialsLoading ? (
            <div className="p-8 text-sm text-neutral-500">Loading...</div>
          ) : externalCredentials.length === 0 ? (
            <div className="p-8 text-sm text-neutral-500">
              No external API credentials yet.
            </div>
          ) : (
            <div className="divide-y divide-neutral-200">
              {externalCredentials.map((credential) => {
                const status = getExternalCredentialStatus(credential);
                return (
                  <div key={credential.id} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-neutral-900">
                            {credential.name}
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}
                          >
                            {status.label}
                          </span>
                          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
                            {credential.authType === "header"
                              ? credential.headerName
                              : "Authorization: Bearer"}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
                          <span>
                            Domains {credential.allowedDomains.join(", ")}
                          </span>
                          <span>
                            Expires {formatDate(credential.expiresAt)}
                          </span>
                          <span>
                            Last used {formatDate(credential.lastUsedAt)}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2">
                          <code className="min-w-0 flex-1 truncate text-xs text-neutral-700">
                            {credential.id}
                          </code>
                          <button
                            type="button"
                            onClick={() => copyCredentialId(credential.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 hover:bg-white"
                            title="Copy credential id"
                          >
                            <FiCopy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => revokeExternal(credential)}
                        disabled={!!credential.revokedAt}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                        title="Revoke external API credential"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="rounded-lg border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-neutral-900">
              Integration credentials
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              Tokens generated by this app for external systems calling your project.
            </p>
          </div>

          {isLoading ? (
            <div className="p-8 text-sm text-neutral-500">Loading...</div>
          ) : credentials.length === 0 ? (
            <div className="p-8 text-sm text-neutral-500">
              No integration credentials yet.
            </div>
          ) : (
            <div className="divide-y divide-neutral-200">
              {credentials.map((credential) => {
                const status = getCredentialStatus(credential);
                return (
                  <div key={credential.id} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-neutral-900">
                            {credential.name}
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
                          <span>Expires {formatDate(credential.expiresAt)}</span>
                          <span>Last used {formatDate(credential.lastUsedAt)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => revoke(credential)}
                        disabled={!!credential.revokedAt}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                        title="Revoke credential"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {credential.permissions.map((permission, index) => (
                        <span
                          key={`${credential.id}-${index}`}
                          className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-700"
                        >
                          {permission.method} {permission.schemaName} /{" "}
                          {permission.kind} / {getPermissionName(permission)}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const IntegrationsPage: React.FC = () => {
  const { currentProject, isInProject } = useCurrentProject();

  if (!isInProject || !currentProject) {
    return <Navigate to="/projects" replace />;
  }

  return <IntegrationsContent currentProject={currentProject} />;
};

export default IntegrationsPage;
