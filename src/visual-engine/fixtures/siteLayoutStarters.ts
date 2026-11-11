import type { ComponentDocument } from "../model";

export const BLANK_NAVBAR_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "blank-navbar",
  name: "Blank responsive navbar",
  kind: "navbar",
  root: {
    id: "navbar-root",
    type: "section",
    style: { spacing: { paddingX: "lg", paddingY: "md" }, color: { background: "surface", text: "text" }, border: { shadow: "sm" } },
    children: [{
      id: "navbar-row",
      type: "flex",
      direction: "row",
      alignment: "center",
      distribution: "between",
      wrap: false,
      gap: "lg",
      children: [
        { id: "navbar-logo", type: "site-logo", style: { sizing: { height: "4rem", width: "auto" } } },
        { id: "navbar-site-name", type: "site-name", style: { typography: { size: "xl", weight: "bold" } } },
        { id: "navbar-desktop-links", type: "navigation-menu", orientation: "horizontal", showChildren: true, activeColor: "#0f766e", hoverColor: "#0d9488", responsive: { visibility: { mobile: false, tablet: false, desktop: true } } },
        { id: "navbar-desktop-language", type: "language-switcher", responsive: { visibility: { mobile: false, tablet: false, desktop: true } } },
        { id: "navbar-mobile-toggle", type: "menu-toggle", label: "Menu", targetId: "navbar-mobile-panel", responsive: { visibility: { mobile: true, tablet: true, desktop: false } }, style: { spacing: { padding: "sm" }, border: { radius: "md", width: "thin", color: "text-subtle" } } },
      ],
    }, {
      id: "navbar-mobile-panel",
      type: "menu-panel",
      responsive: { visibility: { mobile: true, tablet: true, desktop: false } },
      style: { spacing: { padding: "lg" }, color: { background: "surface", text: "text" }, border: { shadow: "md" } },
      children: [{ id: "navbar-mobile-links", type: "navigation-menu", orientation: "vertical", showChildren: true, activeColor: "#0f766e", hoverColor: "#0d9488" }],
    }],
  },
};

export const BLANK_FOOTER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "blank-footer",
  name: "Blank responsive footer",
  kind: "footer",
  root: {
    id: "footer-root",
    type: "section",
    style: { spacing: { padding: "xl" }, color: { background: "surface-muted", text: "text" } },
    children: [{
      id: "footer-layout",
      type: "stack",
      direction: "column",
      alignment: "stretch",
      distribution: "start",
      wrap: false,
      gap: "lg",
      children: [
        { id: "footer-brand", type: "site-name", style: { typography: { size: "xl", weight: "bold" } } },
        { id: "footer-links", type: "footer-links", activeColor: "#0f766e", hoverColor: "#0d9488" },
        { id: "footer-languages", type: "language-switcher" },
        { id: "footer-copyright", type: "copyright", style: { color: { text: "text-muted" }, typography: { size: "sm" } } },
      ],
    }],
  },
};

const forestBackground = [{ kind: "solid" as const, color: { kind: "custom" as const, value: "#122019" } }];
const elevatedForestBackground = [{ kind: "solid" as const, color: { kind: "custom" as const, value: "#192b22" } }];

export const MUSTAFA_PROFESSIONAL_NAVBAR_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "mustafa-professional-navbar",
  name: "Mustafa · Connected system navbar",
  kind: "navbar",
  root: {
    id: "mustafa-navbar-root",
    type: "section",
    style: {
      spacing: { paddingX: "lg", paddingY: "sm" },
      color: { text: "inverse" },
      background: forestBackground,
      border: { width: "hairline", color: "accent", shadow: "md" },
    },
    children: [{
      id: "mustafa-navbar-desktop",
      type: "flex",
      direction: "row",
      alignment: "center",
      distribution: "between",
      wrap: false,
      gap: "xl",
      responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
      style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
      children: [{
        id: "mustafa-navbar-brand",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "md",
        children: [{
          id: "mustafa-navbar-logo",
          type: "site-logo",
          style: {
            background: [{ kind: "solid", color: { kind: "custom", value: "#F5EFE3" } }],
            border: { radius: "full", width: "hairline", color: "accent" },
            custom: { width: "3.25rem", height: "3.25rem", padding: "0.4rem" },
          },
        }, {
          id: "mustafa-navbar-site-name",
          type: "site-name",
          style: { typography: { size: "lg", weight: "bold", tracking: "wide" }, color: { text: "inverse" } },
        }],
      }, {
        id: "mustafa-navbar-links",
        type: "navigation-menu",
        orientation: "horizontal",
        showChildren: false,
        activeColor: "#D6BC63",
        hoverColor: "#F5EFE3",
        style: {
          spacing: { paddingX: "lg", paddingY: "sm" },
          background: elevatedForestBackground,
          color: { text: "inverse-muted" },
          typography: { size: "sm", weight: "semibold", tracking: "wide" },
          border: { radius: "full", width: "hairline", color: "accent", shadow: "sm" },
        },
      }, {
        id: "mustafa-navbar-language",
        type: "language-switcher",
        style: {
          spacing: { paddingX: "md", paddingY: "sm" },
          background: elevatedForestBackground,
          color: { text: "inverse" },
          typography: { size: "sm", weight: "bold" },
          border: { radius: "full", width: "hairline", color: "accent" },
        },
      }],
    }, {
      id: "mustafa-navbar-mobile",
      type: "flex",
      direction: "row",
      alignment: "center",
      distribution: "between",
      wrap: false,
      gap: "md",
      responsive: { visibility: { mobile: true, tablet: false, desktop: false } },
      children: [{
        id: "mustafa-navbar-mobile-brand",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "sm",
        children: [{
          id: "mustafa-navbar-mobile-logo",
          type: "site-logo",
          style: {
            background: [{ kind: "solid", color: { kind: "custom", value: "#F5EFE3" } }],
            border: { radius: "full", width: "hairline", color: "accent" },
            custom: { width: "2.75rem", height: "2.75rem", padding: "0.35rem" },
          },
        }, {
          id: "mustafa-navbar-mobile-name",
          type: "site-name",
          style: { color: { text: "inverse" }, typography: { size: "base", weight: "bold", tracking: "wide" } },
        }],
      }, {
        id: "mustafa-navbar-menu-toggle",
        type: "menu-toggle",
        label: "Menu",
        targetId: "mustafa-navbar-menu-panel",
        style: {
          spacing: { paddingX: "md", paddingY: "sm" },
          background: elevatedForestBackground,
          color: { text: "inverse" },
          typography: { size: "sm", weight: "semibold" },
          border: { radius: "full", width: "thin", color: "accent" },
        },
      }],
    }, {
      id: "mustafa-navbar-menu-panel",
      type: "menu-panel",
      responsive: { visibility: { mobile: true, tablet: false, desktop: false } },
      style: {
        spacing: { padding: "lg", marginTop: "sm" },
        background: elevatedForestBackground,
        color: { text: "inverse" },
        border: { radius: "xl", width: "hairline", color: "accent", shadow: "lg" },
      },
      children: [{
        id: "mustafa-navbar-mobile-links",
        type: "navigation-menu",
        orientation: "vertical",
        showChildren: true,
        activeColor: "#D6BC63",
        hoverColor: "#F5EFE3",
        style: { typography: { size: "base", weight: "semibold" } },
      }, {
        id: "mustafa-navbar-mobile-language",
        type: "language-switcher",
        style: {
          spacing: { marginTop: "lg", paddingTop: "md" },
          color: { text: "inverse-muted" },
          typography: { size: "sm", weight: "bold" },
        },
      }],
    }],
  },
};

export const MUSTAFA_PROFESSIONAL_FOOTER_DOCUMENT: ComponentDocument = {
  version: 2,
  id: "mustafa-professional-footer",
  name: "Mustafa · Connected system footer",
  kind: "footer",
  root: {
    id: "mustafa-footer-root",
    type: "section",
    style: {
      spacing: { paddingX: "xl", paddingY: "2xl" },
      color: { text: "inverse" },
      background: forestBackground,
      border: { width: "hairline", color: "accent" },
    },
    children: [{
      id: "mustafa-footer-layout",
      type: "stack",
      direction: "column",
      alignment: "stretch",
      distribution: "start",
      wrap: false,
      gap: "xl",
      style: { sizing: { width: "full", maxWidth: "7xl", align: "center" } },
      children: [{
        id: "mustafa-footer-main",
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "xl",
        responsive: { visibility: { mobile: false, tablet: true, desktop: true } },
        children: [{
          id: "mustafa-footer-brand",
          type: "flex",
          direction: "row",
          alignment: "center",
          distribution: "start",
          wrap: false,
          gap: "md",
          children: [{
            id: "mustafa-footer-logo",
            type: "site-logo",
            style: {
              background: [{ kind: "solid", color: { kind: "custom", value: "#F5EFE3" } }],
              border: { radius: "full", width: "hairline", color: "accent" },
              custom: { width: "3.5rem", height: "3.5rem", padding: "0.45rem" },
            },
          }, {
            id: "mustafa-footer-site-name",
            type: "site-name",
            style: { color: { text: "inverse" }, typography: { size: "xl", weight: "bold", tracking: "wide" } },
          }],
        }, {
          id: "mustafa-footer-links",
          type: "footer-links",
          activeColor: "#D6BC63",
          hoverColor: "#F5EFE3",
          style: { color: { text: "inverse-muted" }, typography: { size: "sm", weight: "semibold" } },
        }, {
          id: "mustafa-footer-language",
          type: "language-switcher",
          style: {
            spacing: { paddingX: "md", paddingY: "sm" },
            background: elevatedForestBackground,
            color: { text: "inverse" },
            typography: { size: "sm", weight: "bold" },
            border: { radius: "full", width: "hairline", color: "accent" },
          },
        }],
      }, {
        id: "mustafa-footer-mobile",
        type: "stack",
        direction: "column",
        alignment: "center",
        distribution: "start",
        wrap: false,
        gap: "lg",
        responsive: { visibility: { mobile: true, tablet: false, desktop: false } },
        children: [{
          id: "mustafa-footer-mobile-logo",
          type: "site-logo",
          style: {
            background: [{ kind: "solid", color: { kind: "custom", value: "#F5EFE3" } }],
            border: { radius: "full", width: "hairline", color: "accent" },
            custom: { width: "3.25rem", height: "3.25rem", padding: "0.4rem" },
          },
        }, {
          id: "mustafa-footer-mobile-name",
          type: "site-name",
          style: { color: { text: "inverse" }, typography: { size: "lg", weight: "bold", align: "center" } },
        }, {
          id: "mustafa-footer-mobile-links",
          type: "footer-links",
          activeColor: "#D6BC63",
          hoverColor: "#F5EFE3",
          style: { color: { text: "inverse-muted" }, typography: { size: "sm", weight: "semibold", align: "center" } },
        }, {
          id: "mustafa-footer-mobile-language",
          type: "language-switcher",
          style: { color: { text: "inverse" }, typography: { size: "sm", weight: "bold", align: "center" } },
        }],
      }, {
        id: "mustafa-footer-divider",
        type: "divider",
        style: { color: { text: "accent" }, sizing: { width: "full" } },
      }, {
        id: "mustafa-footer-copyright",
        type: "copyright",
        style: { color: { text: "inverse-muted" }, typography: { size: "sm", align: "center", tracking: "wide" } },
      }],
    }],
  },
};

export const SITE_LAYOUT_STARTERS = [
  BLANK_NAVBAR_DOCUMENT,
  BLANK_FOOTER_DOCUMENT,
  MUSTAFA_PROFESSIONAL_NAVBAR_DOCUMENT,
  MUSTAFA_PROFESSIONAL_FOOTER_DOCUMENT,
] as const;
