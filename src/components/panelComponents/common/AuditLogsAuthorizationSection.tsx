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
    <section className="bg-white shadow rounded-lg">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-700">
            <FiShield className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Audit Logs Authorization</h2>
            <p className="mt-1 text-sm text-gray-600">
              Audit logs are shown in react-template. Authentication is always required; authorization limits access to selected project roles.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading authorization settings...</div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
              <div>
                <div className="text-sm font-medium text-gray-900">Require Authorization</div>
                <div className="text-xs text-gray-500">Only selected project roles can open audit logs.</div>
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

        <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
          <div className="text-xs font-semibold uppercase text-gray-500">Current Access</div>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between gap-3">
              <span>Authentication</span>
              <span className="font-medium text-gray-900">Required</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Authorization</span>
              <span className="font-medium text-gray-900">{form.isAuthorized ? "Enabled" : "Disabled"}</span>
            </div>
            <div>
              <span>Project roles</span>
              <div className="mt-1 text-xs text-gray-500">{formatRoles(form.authorizeRole)}</div>
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
    </section>
  );
};
