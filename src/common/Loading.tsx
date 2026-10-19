import { useTranslation } from "react-i18next";

/** Global mutation feedback; individual forms own their disabled/pending state. */
const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex justify-center p-3">
      <div role="status" aria-live="polite" className="inline-flex items-center gap-2 rounded-full border border-ui-border/80 bg-ui-surface/90 px-4 py-2 text-[13px] font-medium text-ui-foreground shadow-ui-popover backdrop-blur-xl">
        <span aria-hidden="true" className="size-4 rounded-full border-2 border-ui-primary border-r-transparent motion-safe:animate-spin" />
        {t("Working…")}
      </div>
    </div>
  );
};
export default Loading;
