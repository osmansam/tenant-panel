import Cookies from "js-cookie";
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
  Cookies.remove("jwt");
  Cookies.remove("refreshToken");

  // Redirect to login
  window.location.href = "/login";
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = Cookies.get("jwt") || localStorage.getItem("jwt");
  const refreshToken =
    Cookies.get("refreshToken") || localStorage.getItem("refreshToken");

  return !!(token || refreshToken);
};

/**
 * Get current access token
 */
export const getAccessToken = (): string | null => {
  return Cookies.get("jwt") || localStorage.getItem("jwt");
};

/**
 * Get current refresh token
 */
export const getRefreshToken = (): string | null => {
  return Cookies.get("refreshToken") || localStorage.getItem("refreshToken");
};

/**
 * Test function to simulate authentication failure (for debugging)
 */
export const simulateAuthFailure = () => {
  logout(true);
};
