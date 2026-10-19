import { useUserContext } from "../context/User.context";
import { readStoredTenant } from "../utils/persistedContext";
import { Tenant } from "../types";

export const useTenant = () => {
  const { user } = useUserContext();

  const getCurrentTenant = readStoredTenant;

  const getAllTenants = (): Tenant[] => {
    return user?.allTenants || [];
  };

  const switchTenant = (tenantId: string) => {
    if (user && user.allTenants) {
      const targetTenant = user.allTenants.find((t) => t.id === tenantId);
      if (targetTenant) {
        localStorage.setItem("currentTenant", JSON.stringify(targetTenant));
        // Reload to reset app state for new tenant context
        window.location.reload();
      }
    }
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
    if (!targetTenantId || !user?.allTenants) return false;

    const tenant = user.allTenants.find((t) => t.id === targetTenantId);
    return tenant?.ownerUserId === user._id;
  };

  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) || false;
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
