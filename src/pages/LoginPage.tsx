import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleCallbackHandler } from "../components/auth/GoogleCallbackHandler";
import { TenantLoginForm } from "../components/auth/TenantLoginForm";
import { H1, H6 } from "../components/panelComponents/Typography";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Check if this is a Google OAuth callback
  const searchParams = new URLSearchParams(location.search);
  const isGoogleCallback =
    searchParams.has("code") || searchParams.has("error");

  const handleError = (error: unknown) => {
    console.error("Login error:", error);
    let message = t("Login failed. Please try again.");

    if (error && typeof error === "object" && "response" in error) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    toast.error(message);
  };

  // Handle Google OAuth callback
  if (isGoogleCallback) {
    return <GoogleCallbackHandler onError={handleError} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <H1 className="text-3xl font-extrabold text-gray-900">
            {t("Welcome Back")}
          </H1>
          <H6 className="mt-2 text-sm text-gray-600">
            {t("Sign in to your tenant account")}
          </H6>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <TenantLoginForm onError={handleError} />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t("New to our platform?")}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                {t("Create a new tenant account")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          {t("By signing in, you agree to our")}{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            {t("Terms of Service")}
          </a>{" "}
          {t("and")}{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            {t("Privacy Policy")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
