import React, { useEffect, useMemo, useState } from "react";
import { FiSave, FiShield } from "react-icons/fi";
import { CheckSwitch } from "../../../common/CheckSwitch";
import { useUserContext } from "../../../context/User.context";
import { OptionType } from "../../../types";
import {
  AuditLogsAuthorizationConfig,
  useAuditLogsAuthorizationConfig,
  useUpdateAuditLogsAuthorizationConfig,
} from "../../../utils/api/auditLogs";
import { useRoleItems } from "../../../utils/api/roleInfo";
import { GenericButton } from "../FormElements/GenericButton";
import SelectInput from "../FormElements/SelectInput";
import { Section, SectionHeader } from "../../ui";

function formatRoles(roles: string[]) {
  if (roles.length === 0) return "No project roles selected";
  return roles.join(", ");
}

export const AuditLogsAuthorizationSection: React.FC = () => {
  const { user } = useUserContext();
  const canManageConfig = Boolean(user?.roles?.length);
  const { data: roleItems = [] } = useRoleItems(canManageConfig);
  const { data: config, isLoading } = useAuditLogsAuthorizationConfig(canManageConfig);
  const updateConfig = useUpdateAuditLogsAuthorizationConfig();
  const [form, setForm] = useState<AuditLogsAuthorizationConfig>({
    isAuthorized: false,
    authorizeRole: [],
  });

  useEffect(() => {
    if (!config) return;
    setForm({
      isAuthorized: config.isAuthorized,
      authorizeRole: config.authorizeRole || [],
    });
  }, [config]);

  const roleOptions: OptionType[] = useMemo(
    () =>
      roleItems.map((role) => ({
        value: role._id,
        label: role.name,
      })),
    [roleItems]
  );

  const selectedRoles = useMemo(
    () => roleOptions.filter((option) => form.authorizeRole.includes(String(option.value))),
    [form.authorizeRole, roleOptions]
  );

  if (!canManageConfig) return null;

  return (
    <Section aria-labelledby="audit-logs-heading">
      <SectionHeader
        title={<span id="audit-logs-heading">Audit Logs Authorization</span>}
        description="Audit logs are shown in react-template. Authentication is always required; authorization limits access to selected project roles."
      />

      <div className="grid gap-6 rounded-ui-lg border border-ui-border bg-ui-surface p-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
        {isLoading ? (
          <div className="text-sm text-ui-muted">Loading authorization settings...</div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-ui-md border border-ui-border bg-ui-surface-subtle p-4">
              <div>
                <div className="text-sm font-medium text-ui-foreground">Require Authorization</div>
                <div className="text-xs text-ui-muted">Only selected project roles can open audit logs.</div>
              </div>
              <CheckSwitch
                checked={form.isAuthorized}
                onChange={() =>
                  setForm((current) => ({
                    isAuthorized: !current.isAuthorized,
                    authorizeRole: current.isAuthorized ? [] : current.authorizeRole,
                  }))
                }
              />
            </div>

            {form.isAuthorized && (
              <SelectInput
                label="Authorized Project Roles"
                options={roleOptions}
                value={selectedRoles}
                isMultiple
                onChange={(selected) => {
                  const roles = Array.isArray(selected)
                    ? selected.map((option) => String(option.value))
                    : [];
                  setForm((current) => ({ ...current, authorizeRole: roles }));
                }}
                placeholder="Select project roles..."
              />
            )}
          </div>
        )}

        <div className="rounded-ui-md border border-ui-border bg-ui-surface-subtle p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-ui-muted">Current Access</div>
          <div className="mt-3 space-y-2 text-sm text-ui-foreground">
            <div className="flex justify-between gap-3">
              <span className="text-ui-muted">Authentication</span>
              <span className="font-medium text-ui-foreground">Required</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-ui-muted">Authorization</span>
              <span className="font-medium text-ui-foreground">{form.isAuthorized ? "Enabled" : "Disabled"}</span>
            </div>
            <div>
              <span className="text-ui-muted">Project roles</span>
              <div className="mt-1 text-xs text-ui-muted">{formatRoles(form.authorizeRole)}</div>
            </div>
          </div>
          <GenericButton
            iconLeft={<FiSave />}
            disabled={updateConfig.isPending}
            isLoading={updateConfig.isPending}
            onClick={() =>
              updateConfig.mutate({
                isAuthorized: form.isAuthorized,
                authorizeRole: form.isAuthorized ? form.authorizeRole : [],
              })
            }
            className="mt-4"
            fullWidth
          >
            Save
          </GenericButton>
        </div>
      </div>
    </Section>
  );
};
