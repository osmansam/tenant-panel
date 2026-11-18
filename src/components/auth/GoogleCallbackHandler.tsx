import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

import Loading from "../../common/Loading";
import { useGoogleCallback } from "../../utils/api/auth";

interface GoogleCallbackHandlerProps {
  onError?: (error: unknown) => void;
}

export const GoogleCallbackHandler: React.FC<GoogleCallbackHandlerProps> = ({ onError }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [failed, setFailed] = useState(false);
  const processedCallback = useRef<string>();
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const handleError = useCallback((error: unknown) => {
    setFailed(true);
    onErrorRef.current?.(error);
  }, []);
  const { handleGoogleCallback } = useGoogleCallback(undefined, handleError);
  const code = searchParams.get("code");
  const providerError = searchParams.get("error");

  useEffect(() => {
    const callbackKey = JSON.stringify([code, providerError]);
    // Authorization codes are single use. StrictMode and parent rerenders must
    // not exchange the same code again, including after a failed request.
    if (processedCallback.current === callbackKey) return;
    processedCallback.current = callbackKey;
    setFailed(false);
    if (providerError) {
      handleError(new Error(`Google OAuth error: ${providerError}`));
    } else if (!code) {
      handleError(new Error("No authorization code received from Google"));
    } else {
      handleGoogleCallback(code);
    }
  }, [code, providerError, handleGoogleCallback, handleError]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {failed ? (
          <>
            <p role="alert" className="text-ui-danger">
              {t("Google sign-in could not be completed. Please try signing in again.")}
            </p>
            <Link to="/login" replace className="ui-focus-ring mt-4 inline-block text-ui-primary underline">
              {t("Back to sign in")}
            </Link>
          </>
        ) : (
          <>
            <Loading />
            <p role="status" className="mt-4 text-ui-muted">{t("Completing Google sign-in...")}</p>
          </>
        )}
      </div>
    </div>
  );
};
