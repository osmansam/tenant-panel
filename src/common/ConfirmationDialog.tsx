import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, ResponsiveActionBar, WorkspaceDialog } from "../components/ui";

export function ConfirmationDialog({ isOpen, close, confirm, title, text }: {
  isOpen: boolean;
  close: () => void;
  confirm: () => void;
  title: string;
  text: string;
}) {
  const { t } = useTranslation();
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <WorkspaceDialog
      open={isOpen}
      onClose={close}
      title={title}
      layer="nested"
      className="max-w-md"
      initialFocusRef={cancelRef}
      footer={<ResponsiveActionBar><Button ref={cancelRef} type="button" variant="outline" onClick={close}>{t("Cancel")}</Button><Button type="button" onClick={confirm}>{t("Confirm")}</Button></ResponsiveActionBar>}
    >
      <p className="text-sm leading-6 text-ui-muted">{text}</p>
    </WorkspaceDialog>
  );
}
