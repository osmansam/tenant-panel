import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { UNSAFE_DataRouterContext, useBlocker } from "react-router-dom";
import { Button, WorkspaceDialog } from "../components/ui";

interface UnsavedChangesGuardProps { when: boolean; saving?: boolean }

function NavigationPrompt({ when, saving }: UnsavedChangesGuardProps) {
  const { t } = useTranslation();
  const blocker = useBlocker(({ currentLocation, nextLocation }) => when && (
    currentLocation.pathname !== nextLocation.pathname ||
    currentLocation.search !== nextLocation.search
  ));
  const keepEditingRef = useRef<HTMLButtonElement>(null);
  return <WorkspaceDialog open={blocker.state === "blocked"} onClose={() => blocker.state === "blocked" && blocker.reset()} title={t("Leave without saving?")} layer="nested" className="max-w-md" initialFocusRef={keepEditingRef}
    footer={<div className="flex flex-wrap justify-end gap-2.5"><Button ref={keepEditingRef} variant="outline" onClick={() => blocker.state === "blocked" && blocker.reset()}>{t("Keep editing")}</Button><Button variant="destructive" disabled={saving} onClick={() => blocker.state === "blocked" && blocker.proceed()}>{t("Discard and leave")}</Button></div>}
  ><p className="text-sm leading-6 text-ui-muted">{saving ? t("Your page is still saving. Wait for the request to finish before leaving.") : t("Your workspace has changes that may not be saved. Keep editing to save them, or discard them and leave this page.")}</p></WorkspaceDialog>;
}

/** Routing prompts are available in the application's data router. */
export function UnsavedChangesGuard(props: UnsavedChangesGuardProps) {
  const router = useContext(UNSAFE_DataRouterContext);
  return router ? <NavigationPrompt {...props} /> : null;
}
