import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthShell } from "../components/auth/AuthShell";
import { TenantRegisterForm } from "../components/auth/TenantRegisterForm";
import { logger } from "../utils/logger";

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();

  const handleError = (error: unknown) => {
    logger.error("Registration error:", error);
    let message = t("Registration failed. Please try again.");

    if (error && typeof error === "object" && "response" in error) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    toast.error(message);
  };

  return (
    <AuthShell
      title={t("Create Your Tenant")}
      subtitle={t("Set up your organization and start managing your projects")}
      footer={
        <>
          {t("By creating an account, you agree to our")}{" "}
          <span className="font-medium text-ui-primary">
            {t("Terms of Service")}
          </span>{" "}
          {t("and")}{" "}
          <span className="font-medium text-ui-primary">
            {t("Privacy Policy")}
          </span>
        </>
      }
    >
      <TenantRegisterForm onError={handleError} />

      <div className="mt-7 border-t border-ui-border/80 pt-5 text-center text-[13px]">
        <span className="text-ui-muted">{t("Already have an account?")}</span>{" "}
        <Link
          to="/login"
          className="font-medium text-ui-primary transition-opacity hover:opacity-80"
        >
          {t("Sign in to your tenant")}
        </Link>
      </div>
    </AuthShell>
  );
};

export default RegisterPage;
