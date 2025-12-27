import React from "react";
import { useTranslation } from "react-i18next";
import { FiMenu } from "react-icons/fi";
import { GenericButton } from "../components/panelComponents/FormElements/GenericButton";
import { H1, H2, H6 } from "../components/panelComponents/Typography";
import { useGeneralContext } from "../context/General.context";
import { useUserContext } from "../context/User.context";
import useTenant from "../hooks/useTenant";
import { useTenantLogout } from "../utils/api/auth";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { setIsSidebarOpen } = useGeneralContext();
  const { currentTenant, allTenants, hasMultipleTenants, switchTenant } =
    useTenant();
  const { tenantLogout } = useTenantLogout();

  const handleLogout = () => {
    tenantLogout();
  };

  const handleSwitchTenant = (tenantId: string) => {
    switchTenant(tenantId);
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-6">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden mr-3 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <FiMenu className="h-6 w-6" />
              </button>
              <H1 className="text-2xl font-bold text-gray-900">
                {currentTenant?.name || t("Dashboard")}
              </H1>
              {currentTenant?.slug && (
                <span className="ml-3 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {currentTenant.slug}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {t("Welcome")}, {user?.name || user?.email}
              </span>
              <GenericButton onClick={handleLogout} variant="outline" size="sm">
                {t("Logout")}
              </GenericButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div>
          {/* Welcome Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <H2 className="text-lg font-medium text-gray-900 mb-4">
                {t("Welcome to your tenant dashboard")}
              </H2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <H6 className="font-medium text-blue-900">
                    {t("Current Tenant")}
                  </H6>
                  <p className="text-blue-700">{currentTenant?.name}</p>
                  <p className="text-sm text-blue-600">{currentTenant?.slug}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <H6 className="font-medium text-green-900">
                    {t("Your Role")}
                  </H6>
                  <p className="text-green-700">{user?.role || t("Member")}</p>
                  {user?.roles && user.roles.length > 1 && (
                    <p className="text-sm text-green-600">
                      +{user.roles.length - 1} {t("more roles")}
                    </p>
                  )}
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <H6 className="font-medium text-purple-900">
                    {t("Account Status")}
                  </H6>
                  <p className="text-purple-700">{t("Active")}</p>
                  <p className="text-sm text-purple-600">{t("Full Access")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tenant Switcher */}
          {hasMultipleTenants() && (
            <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <H2 className="text-lg font-medium text-gray-900 mb-4">
                  {t("Your Tenants")}
                </H2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allTenants.map((tenant) => (
                    <div
                      key={tenant.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        tenant.id === currentTenant?.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                      onClick={() => {
                        if (tenant.id !== currentTenant?.id) {
                          handleSwitchTenant(tenant.id);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <H6
                            className={`font-medium ${
                              tenant.id === currentTenant?.id
                                ? "text-blue-900"
                                : "text-gray-900"
                            }`}
                          >
                            {tenant.name}
                          </H6>
                          <p
                            className={`text-sm ${
                              tenant.id === currentTenant?.id
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                          >
                            {tenant.slug}
                          </p>
                        </div>
                        {tenant.id === currentTenant?.id && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {t("Current")}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <H2 className="text-lg font-medium text-gray-900 mb-4">
                {t("Quick Actions")}
              </H2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <GenericButton
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">📊</div>
                    <span className="text-sm">{t("View Analytics")}</span>
                  </div>
                </GenericButton>
                <GenericButton
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">👥</div>
                    <span className="text-sm">{t("Manage Users")}</span>
                  </div>
                </GenericButton>
                <GenericButton
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">⚙️</div>
                    <span className="text-sm">{t("Settings")}</span>
                  </div>
                </GenericButton>
                <GenericButton
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">📋</div>
                    <span className="text-sm">{t("View Logs")}</span>
                  </div>
                </GenericButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
