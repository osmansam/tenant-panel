export type BrandingAssetSlot = "logo" | "compactLogo" | "favicon";

export interface BrandingAsset {
  url: string;
  provider: "cloudinary";
  assetId: string;
  width: number;
  height: number;
  format: "png" | "jpeg" | "webp";
  bytes: number;
}

export interface BrandingOverrides {
  displayName?: string;
  logo?: BrandingAsset;
  compactLogo?: BrandingAsset;
  favicon?: BrandingAsset;
  logoAlt?: string;
  primaryColor?: string;
  loginBrandingEnabled?: boolean;
  version?: number;
}

export interface EffectiveBranding {
  displayName: string;
  logoUrl: string;
  compactLogoUrl: string;
  faviconUrl: string;
  logoAlt: string;
  primaryColor: string;
  loginBrandingEnabled: boolean;
  version: number;
}

export interface BrandingManagementResponse {
  overrides?: BrandingOverrides;
  effective: EffectiveBranding;
}

export interface BrandingPatch {
  displayName?: string;
  logoAlt?: string;
  primaryColor?: string;
  loginBrandingEnabled?: boolean;
  reset?: Array<
    "displayName" | "logoAlt" | "primaryColor" | "loginBrandingEnabled"
  >;
}
