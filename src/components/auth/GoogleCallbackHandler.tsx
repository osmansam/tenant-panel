import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import Loading from "../../common/Loading";
import { useGoogleCallback } from "../../utils/api/auth";

interface GoogleCallbackHandlerProps {
  onError?: (error: unknown) => void;
}

export const GoogleCallbackHandler: React.FC<GoogleCallbackHandlerProps> = ({
  onError,
}) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { handleGoogleCallback } = useGoogleCallback(undefined, onError);

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("Google OAuth error:", error);
      if (onError) {
        onError(new Error(`Google OAuth error: ${error}`));
      }
      return;
    }

    if (code) {
      handleGoogleCallback(code);
    } else {
      console.error("No authorization code received from Google");
      if (onError) {
        onError(new Error("No authorization code received from Google"));
      }
    }
  }, [searchParams, handleGoogleCallback, onError]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loading />
        <p className="mt-4 text-gray-600">
          {t("Completing Google sign-in...")}
        </p>
      </div>
    </div>
  );
};
