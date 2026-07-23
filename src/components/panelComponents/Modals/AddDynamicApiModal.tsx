import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { CheckSwitch } from "../../../common/CheckSwitch";
import { OptionType } from "../../../types";
import { DynamicApiModel } from "../../../utils/api/container";
import { useRoleItems } from "../../../utils/api/roleInfo";
import { GenericButton } from "../FormElements/GenericButton";
import SelectInput from "../FormElements/SelectInput";
import TextInput from "../FormElements/TextInput";

interface AddDynamicApiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDynamicApi: (dynamicApi: DynamicApiModel) => boolean;
  editDynamicApi?: DynamicApiModel | null;
}

type DynamicApiFormData = Partial<DynamicApiModel> & {
  dependenciesText?: string;
};

const HTTP_METHOD_OPTIONS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const normalizeDependencies = (dependenciesText: string): string[] =>
  dependenciesText
    .split(",")
    .map((dependency) => dependency.trim())
    .filter(Boolean);

export const AddDynamicApiModal: React.FC<AddDynamicApiModalProps> = ({
  isOpen,
  onClose,
  onAddDynamicApi,
  editDynamicApi = null,
}) => {
  const { t } = useTranslation();
  const { data: roleItems = [] } = useRoleItems();

  const defaultApiData: DynamicApiFormData = {
    name: "",
    url: "",
    method: "GET",
    dependencies: [],
    dependenciesText: "",
    isAuthenticated: false,
    isAuthorized: false,
    authorizeRole: [],
    isActive: true,
    isRedisCached: false,
    cacheTime: 0,
  };

  const [apiData, setApiData] = useState<DynamicApiFormData>(defaultApiData);
  const [formKey, setFormKey] = useState(0);

  const roleOptions: OptionType[] = useMemo(
    () =>
      roleItems.map((role) => ({
        value: role._id,
        label: role.name,
      })),
    [roleItems]
  );

  useEffect(() => {
    if (!isOpen) return;

    if (editDynamicApi) {
      setApiData({
        name: editDynamicApi.name,
        url: editDynamicApi.url,
        method: editDynamicApi.method || "GET",
        dependencies: editDynamicApi.dependencies || [],
        dependenciesText: (editDynamicApi.dependencies || []).join(", "),
        isAuthenticated: editDynamicApi.isAuthenticated,
        isAuthorized: editDynamicApi.isAuthorized,
        authorizeRole: editDynamicApi.authorizeRole || [],
        isActive: editDynamicApi.isActive,
        isRedisCached: editDynamicApi.isRedisCached,
        cacheTime: editDynamicApi.cacheTime,
      });
    } else {
      setApiData(defaultApiData);
    }

    setFormKey((current) => current + 1);
  }, [editDynamicApi, isOpen]);

  const handleClose = () => {
    setApiData(defaultApiData);
    onClose();
  };

  const handleSubmit = () => {
    if (!apiData.name?.trim()) {
      toast.error(t("API name is required"));
      return;
    }

    if (!apiData.url?.trim()) {
      toast.error(t("API URL is required"));
      return;
    }

    if (!apiData.method?.trim()) {
      toast.error(t("HTTP method is required"));
      return;
    }

    const dynamicApi: DynamicApiModel = {
      name: apiData.name.trim(),
      url: apiData.url.trim(),
      method: apiData.method.trim().toUpperCase(),
      dependencies: normalizeDependencies(apiData.dependenciesText || ""),
      isAuthenticated: apiData.isAuthenticated || false,
      isAuthorized: apiData.isAuthorized || false,
      authorizeRole: apiData.authorizeRole || [],
      isActive: apiData.isActive !== undefined ? apiData.isActive : true,
      isRedisCached: apiData.isRedisCached || false,
      cacheTime: apiData.cacheTime || 0,
    };

    if (onAddDynamicApi(dynamicApi)) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />

        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
          <div className="mb-6 flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {editDynamicApi ? t("Edit Dynamic API") : t("Add Dynamic API")}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 transition-colors hover:text-gray-600"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="max-h-[70vh] space-y-6 overflow-y-auto">
            <div>
              <TextInput
                key={`dynamic-api-name-${formKey}`}
                label={t("API Name")}
                type="text"
                value={apiData.name || ""}
                onChange={(value: string) =>
                  setApiData({ ...apiData, name: value })
                }
                placeholder={t("e.g., paymentStatus")}
                requiredField={true}
                disabled={!!editDynamicApi}
              />
              <p className="mt-1 text-xs text-gray-500">
                {editDynamicApi
                  ? t("API name cannot be changed when editing")
                  : t("Unique identifier for this Dynamic API")}
              </p>
            </div>

            <TextInput
              key={`dynamic-api-url-${formKey}`}
              label={t("API URL")}
              type="text"
              value={apiData.url || ""}
              onChange={(value: string) =>
                setApiData({ ...apiData, url: value })
              }
              placeholder="https://api.example.com/status"
              requiredField={true}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t("HTTP Method")} <span className="text-red-500">*</span>
              </label>
              <select
                value={apiData.method || "GET"}
                onChange={(event) =>
                  setApiData({ ...apiData, method: event.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {HTTP_METHOD_OPTIONS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <TextInput
              key={`dynamic-api-dependencies-${formKey}`}
              label={t("Dependencies")}
              type="text"
              value={apiData.dependenciesText || ""}
              onChange={(value: string) =>
                setApiData({ ...apiData, dependenciesText: value })
              }
              placeholder={t("id, token, customerId")}
            />

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t("Active")}
                </label>
                <p className="text-xs text-gray-500">
                  {t("Enable or disable this Dynamic API")}
                </p>
              </div>
              <CheckSwitch
                onChange={() =>
                  setApiData({ ...apiData, isActive: !apiData.isActive })
                }
                checked={apiData.isActive ?? true}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t("Require Authentication")}
                </label>
                <p className="text-xs text-gray-500">
                  {t("Users must be logged in to access this API")}
                </p>
              </div>
              <CheckSwitch
                onChange={() =>
                  setApiData({
                    ...apiData,
                    isAuthenticated: !apiData.isAuthenticated,
                  })
                }
                checked={apiData.isAuthenticated || false}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t("Require Authorization")}
                </label>
                <p className="text-xs text-gray-500">
                  {t("Users must have specific roles to access this API")}
                </p>
              </div>
              <CheckSwitch
                onChange={() =>
                  setApiData({
                    ...apiData,
                    isAuthorized: !apiData.isAuthorized,
                  })
                }
                checked={apiData.isAuthorized || false}
              />
            </div>

            {apiData.isAuthorized && (
              <div>
                <SelectInput
                  label={t("Authorized Roles")}
                  options={roleOptions}
                  value={
                    roleOptions.filter((option) =>
                      apiData.authorizeRole?.includes(String(option.value))
                    ) || null
                  }
                  onChange={(selected) => {
                    const roles = selected
                      ? (selected as OptionType[]).map((option) =>
                          String(option.value)
                        )
                      : [];
                    setApiData({ ...apiData, authorizeRole: roles });
                  }}
                  placeholder={t("Select roles...")}
                  isMultiple={true}
                  requiredField={false}
                />
              </div>
            )}

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t("Enable Redis Caching")}
                </label>
                <p className="text-xs text-gray-500">
                  {t("Cache API results in Redis for better performance")}
                </p>
              </div>
              <CheckSwitch
                onChange={() =>
                  setApiData({
                    ...apiData,
                    isRedisCached: !apiData.isRedisCached,
                  })
                }
                checked={apiData.isRedisCached || false}
              />
            </div>

            {apiData.isRedisCached && (
              <TextInput
                label={t("Cache Time (seconds)")}
                type="number"
                value={apiData.cacheTime?.toString() || "0"}
                onChange={(value: string) =>
                  setApiData({ ...apiData, cacheTime: parseInt(value) || 0 })
                }
                placeholder="10"
              />
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <GenericButton variant="outline" onClick={handleClose}>
              {t("Cancel")}
            </GenericButton>
            <GenericButton onClick={handleSubmit}>
              {editDynamicApi ? t("Update API") : t("Add API")}
            </GenericButton>
          </div>
        </div>
      </div>
    </div>
  );
};
