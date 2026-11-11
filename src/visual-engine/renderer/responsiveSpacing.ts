import type { Breakpoint, ComponentNode, ResponsiveSpacingSpec, SpacingToken, StyleSpec } from "../model";
import { isSafeCustomLength } from "../model/styles";

const SPACING_VALUES: Record<SpacingToken, string> = {
  none: "0",
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
};

const BREAKPOINT_ORDER: readonly Breakpoint[] = ["mobile", "tablet", "desktop"];
const BREAKPOINT_QUERIES: Record<Breakpoint, string> = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px)",
  desktop: "(min-width: 1024px)",
};

const SPACING_SIDES = [
  { side: "top", specific: "Top", axis: "Y" },
  { side: "right", specific: "Right", axis: "X" },
  { side: "bottom", specific: "Bottom", axis: "Y" },
  { side: "left", specific: "Left", axis: "X" },
] as const;

function hashClassName(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `ve-rs-${(hash >>> 0).toString(36)}`;
}

export function responsiveSpacingClassName(documentId: string, nodeId: string): string {
  return hashClassName(`${documentId}:${nodeId}`);
}

export function responsiveChildGapClassName(documentId: string, nodeId: string): string {
  return hashClassName(`${documentId}:${nodeId}:gap`);
}

export function hasResponsiveChildGap(node: ComponentNode): boolean {
  return Object.values(node.responsive?.spacing ?? {}).some((spec) => spec?.spacing?.gap !== undefined || spec?.custom?.gap !== undefined);
}

function tokenValue(token: SpacingToken): string {
  return SPACING_VALUES[token];
}

function spacingDeclarations(spec: ResponsiveSpacingSpec | undefined, gapOnly = false): string {
  if (spec === undefined) return "";
  const declarations: string[] = [];
  const spacing = spec.spacing;
  if (spacing !== undefined && !gapOnly) {
    (["padding", "margin"] as const).forEach((kind) => {
      const base = spacing[kind];
      if (base !== undefined) declarations.push(`${kind}:${tokenValue(base)} !important`);
      SPACING_SIDES.forEach(({ side, specific, axis }) => {
        const specificValue = spacing[`${kind}${specific}` as keyof StyleSpec["spacing"]] as SpacingToken | undefined;
        const axisValue = spacing[`${kind}${axis}` as keyof StyleSpec["spacing"]] as SpacingToken | undefined;
        if (specificValue !== undefined) declarations.push(`${kind}-${side}:${tokenValue(specificValue)} !important`);
        else if (axisValue !== undefined) declarations.push(`${kind}-${side}:${tokenValue(axisValue)} !important`);
      });
    });
  }
  if (spacing?.gap !== undefined) declarations.push(`gap:${tokenValue(spacing.gap)} !important`);
  const customPadding = spec.custom?.padding;
  const customMargin = spec.custom?.margin;
  const customGap = spec.custom?.gap;
  if (!gapOnly && customPadding !== undefined && isSafeCustomLength(customPadding)) declarations.push(`padding:${customPadding} !important`);
  if (!gapOnly) SPACING_SIDES.forEach(({ side, specific }) => {
    const value = spec.custom?.[`padding${specific}`];
    if (value !== undefined && isSafeCustomLength(value)) declarations.push(`padding-${side}:${value} !important`);
  });
  if (!gapOnly && customMargin !== undefined && isSafeCustomLength(customMargin)) declarations.push(`margin:${customMargin} !important`);
  if (customGap !== undefined && isSafeCustomLength(customGap)) declarations.push(`gap:${customGap} !important`);
  return declarations.join(";");
}

function collectRules(node: ComponentNode, documentId: string): Array<{ breakpoint: Breakpoint; rule: string }> {
  const rules: Array<{ breakpoint: Breakpoint; rule: string }> = [];
  const spacing = node.responsive?.spacing;
  if (spacing !== undefined) {
    const selector = `.${responsiveSpacingClassName(documentId, node.id)}`;
    const gapSelector = `.${responsiveChildGapClassName(documentId, node.id)}`;
    BREAKPOINT_ORDER.forEach((breakpoint) => {
      const spec = spacing[breakpoint];
      const declarations = spacingDeclarations(spec);
      if (declarations.length > 0) rules.push({ breakpoint, rule: `${selector}{${declarations}}` });
      const gapDeclarations = spacingDeclarations(spec, true);
      if (gapDeclarations.length > 0) rules.push({ breakpoint, rule: `${gapSelector}{${gapDeclarations}}` });
    });
  }
  if ("children" in node) node.children.forEach((child) => rules.push(...collectRules(child, documentId)));
  return rules;
}

export function buildResponsiveSpacingCss(root: ComponentNode, documentId: string, breakpoint?: Breakpoint): string {
  const rules = collectRules(root, documentId);
  if (rules.length === 0) return "";
  if (breakpoint !== undefined) {
    const limit = BREAKPOINT_ORDER.indexOf(breakpoint);
    return rules
      .filter(({ breakpoint: ruleBreakpoint }) => BREAKPOINT_ORDER.indexOf(ruleBreakpoint) <= limit)
      .map(({ rule }) => rule)
      .join("\n");
  }
  return BREAKPOINT_ORDER.flatMap((activeBreakpoint) => rules
    .filter(({ breakpoint: ruleBreakpoint }) => ruleBreakpoint === activeBreakpoint)
    .map(({ rule }) => `@media ${BREAKPOINT_QUERIES[activeBreakpoint]} { ${rule} }`))
    .join("\n");
}
