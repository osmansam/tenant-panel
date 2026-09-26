import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
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
    <main className="flex min-h-screen flex-col justify-center bg-ui-page px-4 py-8 font-ui sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-ui-lg bg-ui-foreground text-sm font-semibold text-ui-surface" aria-hidden="true">TP</div>
          <h1 className="text-2xl font-semibold tracking-tight text-ui-foreground">
            {t("Welcome Back")}
          </h1>
          <p className="mt-2 text-sm text-ui-muted">
            {t("Sign in to your tenant account")}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-7 w-full max-w-md">
        <div className="rounded-ui-lg border border-ui-border bg-ui-surface px-5 py-6 shadow-sm sm:px-8">
          <TenantLoginForm onError={handleError} />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-ui-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-ui-surface text-ui-muted">
                  {t("New to our platform?")}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="font-medium text-ui-primary hover:opacity-80 transition-colors duration-200"
              >
                {t("Create a new tenant account")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-md px-2 text-center">
        <p className="text-xs text-ui-muted">
          {t("By signing in, you agree to our")}{" "}
          <a href="#" className="text-ui-primary hover:opacity-80">
            {t("Terms of Service")}
          </a>{" "}
          {t("and")}{" "}
          <a href="#" className="text-ui-primary hover:opacity-80">
            {t("Privacy Policy")}
          </a>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
