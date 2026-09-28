import type { BadgeProps, BadgeVariant } from "../ui";

const methodVariants: Record<string, BadgeVariant> = {
  GET: "success",
  POST: "info",
  PUT: "warning",
  PATCH: "warning",
  DELETE: "danger",
};

export function getHttpMethodBadgeTreatment(
  method: string,
): Pick<BadgeProps, "variant" | "className"> {
  return {
    variant: methodVariants[method.trim().toUpperCase()] ?? "mono",
    className: "font-mono font-semibold uppercase tracking-wider",
  };
}
