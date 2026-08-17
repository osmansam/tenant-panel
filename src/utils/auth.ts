import { toast } from "react-toastify";

/**
 * Centralized logout utility that can be used from anywhere in the app
 * including axios interceptors
 */
export const logout = (
  showMessage: boolean = false,
  reason: string = "Session expired"
) => {
  console.log("Logout triggered:", {
    showMessage,
    reason,
    timestamp: new Date().toISOString(),
  });

  // Show toast notification if requested
  if (showMessage) {
    toast.error(`${reason}. Please log in again.`);
  }

  // Clear all stored data
  localStorage.clear();

  // Redirect to login
  window.location.href = "/login";
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("user");
};

/**
 * Get current access token
 */
export const getAccessToken = (): string | null => {
  return null;
};

/**
 * Get current refresh token
 */
export const getRefreshToken = (): string | null => {
  return null;
};

/**
 * Test function to simulate authentication failure (for debugging)
 */
export const simulateAuthFailure = () => {
  logout(true);
};
