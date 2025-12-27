import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TenantRegisterCredentials,
  useGoogleLogin,
  useTenantRegister,
} from "../../utils/api/auth";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";
import TextInput from "../panelComponents/FormElements/TextInput";

interface TenantRegisterFormProps {
  onError?: (error: unknown) => void;
}

export const TenantRegisterForm: React.FC<TenantRegisterFormProps> = ({
  onError,
}) => {
  const { t } = useTranslation();
  const [credentials, setCredentials] = useState<TenantRegisterCredentials>({
    email: "",
    password: "",
    name: "",
    tenantName: "",
    tenantSlug: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<TenantRegisterCredentials>>({});

  const { tenantRegister } = useTenantRegister(undefined, (error) => {
    setIsLoading(false);
    if (onError) onError(error);
  });

  const { initiateGoogleLogin } = useGoogleLogin((error) => {
    if (onError) onError(error);
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<TenantRegisterCredentials> = {};

    if (!credentials.email) {
      newErrors.email = t("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      newErrors.email = t("Please enter a valid email address");
    }

    if (!credentials.password) {
      newErrors.password = t("Password is required");
    } else if (credentials.password.length < 6) {
      newErrors.password = t("Password must be at least 6 characters");
    }

    if (!credentials.name) {
      newErrors.name = t("Full name is required");
    }

    if (!credentials.tenantName) {
      newErrors.tenantName = t("Tenant name is required");
    }

    if (!credentials.tenantSlug) {
      newErrors.tenantSlug = t("Tenant slug is required");
    } else if (!/^[a-z0-9-]+$/.test(credentials.tenantSlug)) {
      newErrors.tenantSlug = t(
        "Tenant slug can only contain lowercase letters, numbers, and hyphens"
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    tenantRegister(credentials);
  };

  const handleGoogleLogin = () => {
    initiateGoogleLogin();
  };

  const handleInputChange =
    (field: keyof TenantRegisterCredentials) => (value: string) => {
      setCredentials((prev) => {
        const newCredentials = {
          ...prev,
          [field]: value,
        };

        // Auto-generate tenant slug from tenant name
        if (field === "tenantName") {
          newCredentials.tenantSlug = value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
        }

        return newCredentials;
      });
    };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {t("Create Tenant Account")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label={t("Email")}
          value={credentials.email}
          onChange={handleInputChange("email")}
          type="email"
          placeholder={t("Enter your email")}
          requiredField={true}
          disabled={isLoading}
          error={errors.email}
          onClear={() => handleInputChange("email")("")}
          isOnClearActive={false}
        />

        <TextInput
          label={t("Password")}
          value={credentials.password}
          onChange={handleInputChange("password")}
          type="password"
          placeholder={t("Enter your password")}
          requiredField={true}
          disabled={isLoading}
          error={errors.password}
          isOnClearActive={false}
        />

        <TextInput
          label={t("Full Name")}
          value={credentials.name}
          onChange={handleInputChange("name")}
          type="text"
          placeholder={t("Enter your full name")}
          requiredField={true}
          disabled={isLoading}
          error={errors.name}
          onClear={() => handleInputChange("name")("")}
          isOnClearActive={false}
        />

        <TextInput
          label={t("Tenant Name")}
          value={credentials.tenantName}
          onChange={handleInputChange("tenantName")}
          type="text"
          placeholder={t("Enter your company/organization name")}
          requiredField={true}
          disabled={isLoading}
          error={errors.tenantName}
          onClear={() => handleInputChange("tenantName")("")}
          isOnClearActive={false}
        />

        <TextInput
          label={t("Tenant Slug")}
          value={credentials.tenantSlug}
          onChange={handleInputChange("tenantSlug")}
          type="text"
          placeholder={t("Enter tenant identifier (URL-friendly)")}
          requiredField={true}
          disabled={isLoading}
          error={errors.tenantSlug}
          onClear={() => handleInputChange("tenantSlug")("")}
          isOnClearActive={false}
        />

        <GenericButton type="submit" disabled={isLoading} className="w-full">
          {isLoading ? t("Creating Account...") : t("Create Account")}
        </GenericButton>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              {t("Or continue with")}
            </span>
          </div>
        </div>

        <GenericButton
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white"
        >
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t("Continue with Google")}
          </div>
        </GenericButton>
      </div>
    </div>
  );
};
