export interface VisualNavigationItem {
  id: string;
  label: string;
  href: string;
  active: boolean;
  children: VisualNavigationItem[];
}

export interface VisualLocaleLink {
  code: string;
  label: string;
  href: string;
  active: boolean;
}

export interface VisualSiteContext {
  siteName: string;
  homeHref?: string;
  logo?: { src: string; alt: string };
  navigation: VisualNavigationItem[];
  locales: VisualLocaleLink[];
  copyright: string;
  /** True when the page defines a background; visual sections then render their root background transparent. */
  pageHasBackground?: boolean;
  /** True when the page has adaptive component colors enabled; custom text paints then use page theme colors. */
  pageComponentColors?: boolean;
}

export const BUILDER_SITE_PREVIEW: VisualSiteContext = {
  siteName: "Your site",
  homeHref: "/",
  logo: { src: "/visual-builder/placeholder.svg", alt: "Your site logo" },
  navigation: [
    { id: "preview-home", label: "Home", href: "/", active: true, children: [] },
    { id: "preview-about", label: "About", href: "/about", active: false, children: [] },
    { id: "preview-contact", label: "Contact", href: "/contact", active: false, children: [] },
  ],
  locales: [
    { code: "en", label: "English", href: "/en", active: true },
    { code: "es", label: "Español", href: "/es", active: false },
  ],
  copyright: `© ${new Date().getFullYear()} Your site`,
};
