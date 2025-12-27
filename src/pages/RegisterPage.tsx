import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TenantRegisterForm } from "../components/auth/TenantRegisterForm";
import { H1, H6 } from "../components/panelComponents/Typography";

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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <H1 className="text-3xl font-extrabold text-gray-900">
            {t("Create Your Tenant")}
          </H1>
          <H6 className="mt-2 text-sm text-gray-600">
            {t("Set up your organization and start managing your projects")}
          </H6>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <TenantRegisterForm onError={handleError} />

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              {t("Sign in to your tenant")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="space-y-2">
          <p className="text-xs text-gray-500">
            {t("By creating an account, you agree to our")}{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              {t("Terms of Service")}
            </a>{" "}
            {t("and")}{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              {t("Privacy Policy")}
            </a>
          </p>
          <p className="text-xs text-gray-500">
            {t("Need help?")}{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              {t("Contact Support")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
