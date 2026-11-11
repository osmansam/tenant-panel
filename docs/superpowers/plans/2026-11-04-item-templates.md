# Item templates implementation plan

> Execute inline with superpowers:executing-plans, preserving the existing working trees and prior changes. User requested this exact extension in the current session. Leave changes uncommitted.

**Goal:** Authors can type `{{item.name}}` and `Price: {{item.price}}` into visual properties and see per-record values in samples and published pages.

**Architecture:** Extend the existing binding resolver in both frontend engine copies; no new networking/model format. Add contextual author guidance and regression coverage.

**Tech stack:** TypeScript, React, Vitest, existing v2 visual document.

**Spec:** ../specs/2026-11-04-item-templates-design.md

## Constraints and review focus

Preserve explicit field-binding behavior, static text, source documents, and unrelated changes. Cover nested/missing/zero/false values, unsafe property traversal, escaped content and non-recursive interpolation, URL rejection, and save/preview/runtime parity. Work in the existing checkouts because this feature extends their uncommitted visual engine.

### Task 1: Shared template resolution

- [x] Add `src/visualBuilder/templateBindings.test.ts` in both frontends: real bindNode/renderer and document round-trip tests for the cases above.
- [x] Run the new tests and confirm interpolation assertions fail against current code.
- [x] Modify `src/visual-engine/renderer/bindings.ts` in both frontends: safe single-pass template resolver; call from resolveBoundNodeValue when no valid explicit binding; allow supported nodes without a bindings object; normalize interpolated URLs with inert fallback.
- [x] Run new tests, existing collection/renderer coverage, and both full suites.

### Task 2: Designer guidance and end-to-end sample authoring

- [x] Add a real inspector-content edit to sample preview test in `src/visualBuilder/visualData.test.tsx`; prove missing interpolation fails first.
- [x] Add syntax guidance in PropertiesInspector's Data binding section and VisualDataTools. Explain Static vs field-selector precedence and canonical item scope. Update usage docs in both frontends.
- [x] Verify both TypeScript checks and production builds; review this feature's changed files and preserve unrelated edits.

## Execution record

Ruling: reuse the current checkouts because their visual engine and host integration are largely uncommitted; a clean worktree would omit the work being extended. No staging or commits.

Ruling: user acceptance covers the exact proposed template syntax and mixed text; implementation details above stay within that request without another approval round.


## Verification — completed 2026-11-04

- RED: seven resolver/renderer assertions failed because templates stayed literal; the authoring sample test also failed at distinct product text. Tests were corrected for the existing rich-text markup and NodePatch union before implementation completion.
- Additional RED → GREEN: canvas raw template image/link URLs were observed, then made inert while preserving editable text tokens. Static nodes keep their original fast path and explicit selector bindings retain precedence.
- Panel full suite: 136 files / 729 tests passed. Runtime full suite: 142 files / 878 tests passed (includes its existing typecheck test counting).
- Both `corepack yarn tsc --noEmit` checks pass. An initial panel check caught a test-only NodePatch union narrowing error, corrected with an `in` guard and rechecked.
- Both direct Vite production builds passed into `/private/tmp/item-template-*-build`; existing chunk-size warnings remain. Focused lint: zero errors.
- Browser script `scripts/verify-item-templates.js`, after existing `visual-data-browser-fixture.js`, typed templates into normal text/image fields, previewed samples, saved exact authored tokens, inserted an independent page section, and rendered five records using one request in react-template under dark OS preference with light output. All API data was in memory; no live records or settings changed. Screenshots in `output/playwright/item-templates/` were visually inspected.
- Fresh read-only review by item_templates_review: no Critical or Important findings. Shared binding/renderer copies match and diff whitespace checks pass.
- Changes left uncommitted, preserving all prior work. Test browser and isolated servers closed after verification.
