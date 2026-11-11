import type { CSSProperties, ReactNode } from "react";
import { useOptionalThemeMode } from "../../../host/ThemeProvider";
import type { ThemeMode } from "../../../theme";
import type { ThemeSwitcherNode } from "../../../model";
import { normalizeImageUrl, normalizeLinkUrl } from "../../../model/urls";
import type { VisualNavigationItem } from "../../../renderer/siteContext";
import type { ComponentRendererMap, SemanticRendererContext } from "../types";
import { InlineEntryText } from "../../../renderer/InlineEntryText";

function safeLink(value: string): string | undefined {
  const result = normalizeLinkUrl(value);
  return result.success ? result.value : undefined;
}

function safeImage(value: string): string | undefined {
  const result = normalizeImageUrl(value);
  return result.success ? result.value : undefined;
}

function brandInitials(siteName: string): string {
  const words = siteName.trim().split(/\s+/).filter(Boolean);
  const initials = words.length > 1
    ? words.slice(0, 2).map((word) => word[0]).join("")
    : words[0]?.slice(0, 2) ?? "S";
  return initials.toUpperCase();
}

function navigationItems(items: VisualNavigationItem[], showChildren: boolean, activeColor?: string, vertical = false): ReactNode {
  return items.map((item) => (
    <li key={item.id}>
      <a
        href={safeLink(item.href)}
        aria-current={item.active ? "page" : undefined}
        className={[
          "transition-colors hover:text-[var(--ve-link-hover)]",
          // Vertical (mobile) lists get comfortable tap targets of ~44px.
          vertical ? "block min-w-11 rounded-lg px-2 py-2.5 text-base font-medium" : "",
        ].filter(Boolean).join(" ")}
        style={item.active && activeColor ? { color: activeColor } : undefined}
      >
        {item.label}
      </a>
      {showChildren && item.children.length > 0 ? <ul className="mt-2 space-y-2 pl-4">{navigationItems(item.children, true, activeColor, vertical)}</ul> : null}
    </li>
  ));
}

function surface(context: SemanticRendererContext, content: ReactNode, extra?: string) {
  return <div className={[context.className, context.backgrounds ? "relative isolate" : "", extra].filter(Boolean).join(" ")} style={context.combineNodeStyles(context.currentNode)}>{context.backgrounds}<div className="relative z-10">{content}</div></div>;
}

const THEME_MODES = ["light", "dark", "system"] as const;

function ThemeSwitcherControl({ node, context }: { node: ThemeSwitcherNode; context: SemanticRendererContext }) {
  const provider = useOptionalThemeMode();
  if (provider?.canSwitch === false) return null;
  const mode = context.themeMode ?? provider?.mode ?? "system";
  const setMode = context.mode === "canvas" ? undefined : provider?.setMode;
  const choose = (nextMode: ThemeMode) => setMode?.(nextMode);
  const labels = node.labels;

  const control = node.presentation === "select" ? (
    <select
      className="ve-theme-switcher__select"
      aria-label={node.accessibleLabel}
      aria-disabled={context.mode === "canvas" || undefined}
      tabIndex={context.mode === "canvas" ? -1 : undefined}
      value={mode}
      onChange={(event) => choose(event.target.value as ThemeMode)}
    >
      {THEME_MODES.map((value) => <option key={value} value={value}>{labels[value]}</option>)}
    </select>
  ) : (
    <div className="ve-theme-switcher__segments" role="group" aria-label={node.accessibleLabel}>
      {THEME_MODES.map((value) => (
        <button
          key={value}
          type="button"
          className="ve-theme-switcher__button"
          aria-pressed={mode === value}
          aria-disabled={context.mode === "canvas" || undefined}
          tabIndex={context.mode === "canvas" ? -1 : undefined}
          onClick={() => choose(value)}
        >
          <InlineEntryText node={node} target={{ base: "labels", sub: value }} context={context} />
        </button>
      ))}
    </div>
  );

  return surface(context, <div className="ve-theme-switcher" data-theme-mode={mode}>{control}</div>);
}

export const siteRenderers = {
  "site-logo": (node, context) => {
    const logo = context.site?.logo;
    const siteName = context.site?.siteName ?? "Site";
    const content = logo
      ? <img src={safeImage(logo.src)} alt={logo.alt || `${siteName} logo`} className="block max-h-full max-w-full object-contain" />
      : <span aria-label={`${siteName} logo`}>{brandInitials(siteName)}</span>;
    const href = context.site?.homeHref && safeLink(context.site.homeHref);
    return surface(context, href ? <a href={href}>{content}</a> : content);
  },
  "site-name": (node, context) => surface(context, context.site?.siteName ?? "Site name"),
  "navigation-menu": (node, context) => {
    const vertical = node.orientation === "vertical";
    return (
      <nav className={[context.className, node.style?.background?.length ? "relative isolate" : ""].filter(Boolean).join(" ")} style={context.combineNodeStyles(node, node.hoverColor ? { "--ve-link-hover": node.hoverColor } as CSSProperties : undefined)} aria-label="Primary navigation">
        {context.backgrounds}
        <ul className={["relative z-10 flex", vertical ? "flex-col -mx-2 gap-1" : "flex-row flex-wrap gap-4"].join(" ")}>
          {navigationItems(context.site?.navigation ?? [], node.showChildren, context.site?.pageComponentColors ? "var(--theme-text)" : node.activeColor, vertical)}
        </ul>
      </nav>
    );
  },
  "language-switcher": (node, context) => surface(context, (
    <nav aria-label="Language selector">
      <ul className="flex flex-wrap items-center gap-3">
        {(context.site?.locales ?? []).map((locale) => (
          <li key={locale.code}>
            <a href={safeLink(locale.href)} hrefLang={locale.code} aria-current={locale.active ? "page" : undefined} className="text-sm font-semibold transition-colors hover:text-[var(--ve-link-hover)]">
              {locale.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )),
  "theme-switcher": (node, context) => <ThemeSwitcherControl node={node} context={context} />,
  "menu-toggle": (node, context) => surface(context, (
    <button
      type="button"
      aria-expanded={context.isMenuPanelOpen(node.targetId)}
      aria-controls={node.targetId}
      onClick={() => context.toggleMenuPanel(node.targetId)}
      className="block w-full min-w-11 cursor-pointer rounded-xl border ve-border-border bg-transparent px-4 py-2.5 text-left text-sm font-medium ve-text-text transition-colors focus:outline-none focus-visible:ring-2 ve-focus-ring hover:border-[var(--theme-primary,#0f766e)]"
    >
      <span className="flex w-full items-center justify-between gap-3">
        <span className="ve-text-text-muted text-sm">{node.label}</span>
        <span aria-hidden="true" className="flex shrink-0 flex-col gap-1" data-testid="menu-toggle-icon">
          <span className="block h-0.5 w-5 rounded-full ve-bg-text" />
          <span className="block h-0.5 w-5 rounded-full ve-bg-text" />
          <span className="block h-0.5 w-5 rounded-full ve-bg-text" />
        </span>
      </span>
    </button>
  )),
  "menu-panel": (node, context) => {
    const open = context.mode === "canvas" || context.isMenuPanelOpen(node.id);
    const style = context.combineNodeStyles(node, open ? undefined : { display: "none" });
    return (
      <div id={node.id} data-testid="visual-menu-panel" hidden={!open} className={[context.className, "overflow-hidden rounded-2xl border ve-border-border ve-bg-surface shadow-sm"].filter(Boolean).join(" ")} style={style}>
        <div className="space-y-4">{context.backgrounds}{context.renderStructuralChildren(node)}</div>
      </div>
    );
  },
  "footer-links": (node, context) => <nav aria-label="Footer navigation" className={[context.className, node.style?.background?.length ? "relative isolate" : ""].filter(Boolean).join(" ")} style={context.combineNodeStyles(node, node.hoverColor ? { "--ve-link-hover": node.hoverColor } as CSSProperties : undefined)}>{context.backgrounds}<ul className="relative z-10 flex flex-wrap gap-4">{navigationItems(context.site?.navigation ?? [], false, context.site?.pageComponentColors ? "var(--theme-text)" : node.activeColor)}</ul></nav>,
  copyright: (node, context) => surface(context, context.site?.copyright ?? `© ${new Date().getFullYear()} Site name`),
} satisfies Pick<ComponentRendererMap, "site-logo" | "site-name" | "navigation-menu" | "language-switcher" | "theme-switcher" | "menu-toggle" | "menu-panel" | "footer-links" | "copyright">;
