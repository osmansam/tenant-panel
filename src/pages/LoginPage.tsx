import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthShell } from "../components/auth/AuthShell";
import { GoogleCallbackHandler } from "../components/auth/GoogleCallbackHandler";
import { TenantLoginForm } from "../components/auth/TenantLoginForm";

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
    <AuthShell
      title={t("Welcome Back")}
      subtitle={t("Sign in to your tenant account")}
      footer={
        <>
          {t("By signing in, you agree to our")}{" "}
          <a href="#" className="font-medium text-ui-primary hover:underline">
            {t("Terms of Service")}
          </a>{" "}
          {t("and")}{" "}
          <a href="#" className="font-medium text-ui-primary hover:underline">
            {t("Privacy Policy")}
          </a>
        </>
      }
    >
      <TenantLoginForm onError={handleError} />

      <div className="mt-7 border-t border-ui-border/80 pt-5 text-center text-[13px]">
        <span className="text-ui-muted">{t("New to our platform?")}</span>{" "}
        <Link
          to="/register"
          className="font-medium text-ui-primary transition-opacity hover:opacity-80"
        >
          {t("Create a new tenant account")}
        </Link>
      </div>
    </AuthShell>
  );
};

export default LoginPage;
