import { useUserContext } from "../context/User.context";
import { readStoredTenant } from "../utils/persistedContext";
import { switchManagementTenant } from "../utils/api/auth";
import { Tenant } from "../types";

export const useTenant = () => {
  const { user } = useUserContext();

  const getCurrentTenant = readStoredTenant;

  const getAllTenants = (): Tenant[] => {
    return user?.allTenants || [];
  };

  const switchTenant = async (tenantId: string) => {
    await switchManagementTenant(tenantId);
    window.location.assign('/projects');
  };

  const isCurrentTenant = (tenantId: string): boolean => {
    const currentTenant = getCurrentTenant();
    return currentTenant?.id === tenantId;
  };

  const hasMultipleTenants = (): boolean => {
    return (user?.allTenants?.length || 0) > 1;
  };

  const isTenantOwner = (tenantId?: string): boolean => {
    const targetTenantId = tenantId || getCurrentTenant()?.id;
    return !!targetTenantId && targetTenantId === user?.tenantId && user?.roleScope === "tenant" && !!user?.roles?.includes("tenant_owner");
  };

  const hasRole = (role: string): boolean => {
    return user?.roleScope !== "project" && (user?.roles?.includes(role) || false);
  };

  return {
    currentTenant: getCurrentTenant(),
    allTenants: getAllTenants(),
    switchTenant,
    isCurrentTenant,
    hasMultipleTenants,
    isTenantOwner,
    hasRole,
  };
};

export default useTenant;
