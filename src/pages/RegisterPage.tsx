import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TenantRegisterForm } from "../components/auth/TenantRegisterForm";

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();

  const handleError = (error: unknown) => {
    console.error("Registration error:", error);
    let message = t("Registration failed. Please try again.");

    if (error && typeof error === "object" && "response" in error) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    toast.error(message);
  };

  return (
    <main className="flex min-h-screen flex-col justify-center bg-ui-page px-4 py-8 font-ui sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-ui-lg bg-ui-foreground text-sm font-semibold text-ui-surface" aria-hidden="true">TP</div>
          <h1 className="text-2xl font-semibold tracking-tight text-ui-foreground">
            {t("Create Your Tenant")}
          </h1>
          <p className="mt-2 text-sm text-ui-muted">
            {t("Set up your organization and start managing your projects")}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-7 w-full max-w-md">
        <div className="rounded-ui-lg border border-ui-border bg-ui-surface px-5 py-6 shadow-sm sm:px-8">
          <TenantRegisterForm onError={handleError} />

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="font-medium text-ui-primary hover:opacity-80 transition-colors duration-200"
            >
              {t("Sign in to your tenant")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-md px-2 text-center">
        <div className="space-y-2">
          <p className="text-xs text-ui-muted">
            {t("By creating an account, you agree to our")}{" "}
            <a href="#" className="text-ui-primary hover:opacity-80">
              {t("Terms of Service")}
            </a>{" "}
            {t("and")}{" "}
            <a href="#" className="text-ui-primary hover:opacity-80">
              {t("Privacy Policy")}
            </a>
          </p>
          <p className="text-xs text-ui-muted">
            {t("Need help?")}{" "}
            <a href="#" className="text-ui-primary hover:opacity-80">
              {t("Contact Support")}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
