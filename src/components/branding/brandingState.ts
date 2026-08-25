import type {
  BrandingOverrides,
  BrandingPatch,
} from "../../types/branding";

export interface BrandingDraft {
  displayName: string;
  logoAlt: string;
  primaryColor: string;
  loginBrandingEnabled: boolean;
}

export type BrandingResetState = Partial<Record<keyof BrandingDraft, boolean>>;

export function validateBrandingDraft(draft: BrandingDraft) {
  const errors: Partial<Record<keyof BrandingDraft, string>> = {};
  const displayName = draft.displayName.trim();
  const logoAlt = draft.logoAlt.trim();
  if (!displayName || displayName.length > 100) {
    errors.displayName = "Display name must be between 1 and 100 characters";
  }
  if (!logoAlt || logoAlt.length > 160) {
    errors.logoAlt = "Logo description must be between 1 and 160 characters";
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test(draft.primaryColor.trim())) {
    errors.primaryColor = "Use a six-digit hex color such as #2563EB";
  }
  return errors;
}

export function buildBrandingPatch(
  original: BrandingOverrides,
  draft: BrandingDraft,
  reset: BrandingResetState,
  changed: BrandingResetState,
): BrandingPatch {
  const patch: BrandingPatch = {};
  const resets = (Object.keys(reset) as Array<keyof BrandingDraft>).filter(
    (field) => reset[field],
  );
  if (resets.length) patch.reset = resets;

  if (
    changed.displayName &&
    !reset.displayName &&
    draft.displayName.trim() !== original.displayName
  ) {
    patch.displayName = draft.displayName.trim();
  }
  if (
    changed.logoAlt &&
    !reset.logoAlt &&
    draft.logoAlt.trim() !== original.logoAlt
  ) {
    patch.logoAlt = draft.logoAlt.trim();
  }
  const color = draft.primaryColor.trim().toUpperCase();
  if (
    changed.primaryColor &&
    !reset.primaryColor &&
    color !== original.primaryColor
  ) {
    patch.primaryColor = color;
  }
  if (
    !reset.loginBrandingEnabled &&
    changed.loginBrandingEnabled &&
    draft.loginBrandingEnabled !== original.loginBrandingEnabled
  ) {
    patch.loginBrandingEnabled = draft.loginBrandingEnabled;
  }
  return patch;
}
