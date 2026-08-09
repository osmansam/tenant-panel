import type { TableActionConfig } from "../types/page";

interface FormLayoutDefaults {
  topClassName?: string;
  generalClassName?: string;
}

const COLUMN_CLASSES = {
  1: "grid grid-cols-1 gap-4",
  2: "grid grid-cols-1 md:grid-cols-2 gap-4",
  3: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
  4: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
} as const;

const joinClasses = (...values: Array<string | undefined | false>) =>
  values.filter(Boolean).join(" ") || undefined;

const withoutVisibleOverflow = (value?: string) =>
  value
    ?.split(/\s+/)
    .filter((className) => className && className !== "overflow-visible")
    .join(" ") || undefined;

export const resolveTableActionFormLayout = (
  action: Pick<TableActionConfig, "formLayout"> | undefined,
  defaults: FormLayoutDefaults = {},
) => {
  const layout = action?.formLayout;
  if (!layout) return defaults;
  const defaultWithoutOverflow = withoutVisibleOverflow(
    defaults.generalClassName,
  );
  const overflowClasses =
    layout.allowOverflow === true
      ? joinClasses(defaultWithoutOverflow, "overflow-visible")
      : layout.allowOverflow === false
        ? defaultWithoutOverflow
        : defaults.generalClassName;

  return {
    topClassName: joinClasses(
      layout.columns ? COLUMN_CLASSES[layout.columns] : defaults.topClassName,
      layout.topClassName?.trim(),
    ),
    generalClassName: joinClasses(
      overflowClasses,
      layout.generalClassName?.trim(),
    ),
  };
};
