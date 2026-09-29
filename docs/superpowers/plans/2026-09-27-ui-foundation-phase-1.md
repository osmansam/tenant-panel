# UI Foundation Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the tokenized Button, legacy GenericButton wrapper, semantic Badge, and interaction geometry without changing feature behavior or requiring broad consumer rewrites.

**Architecture:** The shared Button owns button geometry, semantic variants, loading behavior, and focus treatment. GenericButton remains a compatibility adapter that maps its complete legacy API onto Button, while HTTP method presentation moves from Badge into a small integration-specific semantic mapping helper.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vitest, Testing Library, Vite

**Spec:** `docs/superpowers/specs/2026-09-25-tenant-panel-ui-system-migration-design.md`

## Global Constraints

- Preserve business logic, API contracts, permissions, state behavior, callbacks, payloads, queries, and navigation semantics.
- Do not change `GenericTable` internals or migrate feature consumers from GenericButton in this phase.
- Keep GenericButton's public props, variant names, loading presentation, icon behavior, and default `type="button"` source-compatible.
- Keep Badge semantic; HTTP method styling belongs in a feature mapping helper.
- Define both dense and standard row density tokens rather than imposing one global row height.
- Do not combine primitive cleanup with feature refactors.
- Treat Branding, Collections, Pages, Localization, Integrations, and the Container workspace as the Phase 6 visual baselines.

## Review Focus

- A loading GenericButton remains disabled and busy while retaining its visible label and hiding both legacy icons.
- Legacy `danger`, `black`, `icon`, and `clear` variants resolve through the shared Button without consumer changes.
- Custom `className`, native attributes, events, refs, and default button type continue to reach the real button element.
- Unknown or lower-case HTTP methods resolve predictably without expanding Badge's semantic variants.
- Shared Button hover, border, focus, and size classes do not introduce layout shifts between interaction states.

---

### Task 1: Normalize shared action and badge foundations

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/forms.css`
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/badge.tsx`
- Modify: `src/components/panelComponents/FormElements/GenericButton.tsx`
- Create: `src/components/integrations/http-method-badge.ts`
- Modify: `src/pages/IntegrationsPage.tsx`
- Modify: `src/components/ui/ui-primitives.test.tsx`
- Create: `src/components/panelComponents/FormElements/GenericButton.test.tsx`
- Create: `src/components/integrations/http-method-badge.test.ts`

**Interfaces:**
- Consumes: existing `ButtonProps`, `GenericButtonProps`, `BadgeProps`, and the single HTTP method Badge usage in `IntegrationsPage`.
- Produces: `ButtonVariant` including `success` and `warning`; unchanged GenericButton public types; semantic-only `BadgeVariant`; `getHttpMethodBadgeTreatment(method: string): Pick<BadgeProps, "variant" | "className">`.

- [ ] **Step 1: Write failing primitive, compatibility-wrapper, and HTTP mapping tests**

Cover the Review Focus cases with DOM assertions against real rendered buttons and literal table cases for method mapping.

- [ ] **Step 2: Run focused tests to verify RED**

Run: `yarn test src/components/ui/ui-primitives.test.tsx src/components/panelComponents/FormElements/GenericButton.test.tsx src/components/integrations/http-method-badge.test.ts`

Expected: FAIL because semantic Button variants, compatibility delegation behavior, and the HTTP mapping helper are not implemented.

- [ ] **Step 3: Implement tokens, shared Button variants/geometry, GenericButton delegation, semantic Badge, and the HTTP method helper**

Keep the change limited to the listed files and update only the existing Integrations HTTP Badge call site.

- [ ] **Step 4: Run focused tests to verify GREEN**

Run: `yarn test src/components/ui/ui-primitives.test.tsx src/components/panelComponents/FormElements/GenericButton.test.tsx src/components/integrations/http-method-badge.test.ts`

Expected: all focused tests pass with no type errors.

- [ ] **Step 5: Verify Phase 1**

Run: `yarn test`

Expected: all test files and tests pass; TypeScript reports no errors.

Run: `yarn build`

Expected: TypeScript and Vite production build exit 0.
