# Conditional visual colors implementation plan

> Use executing-plans inline and TDD. Preserve existing checkouts and leave changes uncommitted.

**Goal:** Configure ordered per-record text/background/border colors through the visual designer.
**Architecture:** Bounded optional node rules, pure item-context matching and transient color overrides in the shared renderer. Existing inspector inputs/color pickers and ordinary node patch/history/save/copy paths.
**Tech:** Existing React/TypeScript/Vitest; no dependencies or endpoints.
**Spec:** ../specs/2026-11-04-conditional-colors-design.md

## Global constraints / review focus

- Twenty rules maximum; safe own paths; strict typed comparisons; between [lower,upper).
- First match only; no match/no item keeps original style; no evaluated values saved.
- Safe token/custom colors; solid background/text paint override; border color only.
- Reject malformed/unknown keys, prototype paths and unsupported container rules.
- Shared parser/renderer parity; independent copies; normal undo; no extra requests.

### Task 1 — Model and matcher
Files both: model/conditionalColors.ts, nodes.ts, index.ts, validation.ts; panel operations/updateNode.ts.
- [x] RED parser round-trip, malformed/unsafe/bounds/types, matching boundary tests.
- [x] Implement rule interfaces/validation/pure matcher and optional NodeBase field; parser basekeys and patch allowlist.
- [x] GREEN focused suites in both apps.

### Task 2 — Renderer
Files both: renderer/conditionalColors.ts and VisualRenderer.tsx; tests visualBuilder/conditionalColors.test.ts.
- [x] RED real renderer with several records, default styles, gradient/background precedence and immutable inputs.
- [x] Resolve matched colors only for current item; transient text/solid background paint and inline color overrides through combineNodeStyles. Keep root page background suppression.
- [x] GREEN renderer/matcher tests; verify old style/paint behavior.

### Task 3 — Editor and QA
Panel: editor/ConditionalColorsInspector.tsx, PropertiesInspector.tsx; visualBuilder/conditionalColorsInspector.test.tsx.
- [x] RED authoring tests for path/schema choice, numeric ranges, custom/token colors, order/removal and history.
- [x] Add Conditional colors section to supported item nodes using existing inspector controls.
- [x] GREEN full suites/types/lint and temporary builds; docs.
- [ ] Browser configure/save/sample and runtime boundary colors (needs an isolated project with real login; not run in this session).
- [ ] Fresh focused review, resolve Important issues with RED→GREEN; record evidence and clean own servers/browser.

## Ledger

Ruling: user selected the proposed ordered-rule behavior and all three targets.
Proceed with the established in-session implementation preference; no repeated
approval round. Existing dirty checkouts contain the user's visual engine; keep
working there without staging, commits or worktree moves. Spec settles numeric
boundaries, first-match priority and paint precedence. Unsupported containers use
the same exclusions as existing direct-style editing.
Pre-flight: editor and renderer consume model rules; parser must preserve them
before any history/save/copy integration. Both engines share the same public
contract. Renderer color overrides must win inner text paint/layers while retaining
page root-background suppression and size-preview styles.

## Verification record (2026-11-04)

- react-template: full vitest 78 files / 518 tests, `tsc --noEmit` clean, focused eslint 0 errors, `vite build` to a temp dir passes.
- tenantPanel: full vitest 145 files / 770 tests, `tsc --noEmit` clean, focused eslint 0 errors (2 shared-Input style warnings in the inspector), `vite build` to a temp dir passes.
- Fixed two fixture type errors in `conditionalColorRendering.test.ts` (both repos) found by `tsc`; vitest does not type-check with the current config flags.


Tasks 1 and 2 complete: RED→GREEN actual parser, matcher and multi-record render
tests in both engines. Task 3 editor implemented with RED→GREEN normal history,
metadata/manual fields, numeric ranges, color targets, priority/removal and invalid
edits. First render assertions were corrected to inspect their actual styled P
rather than nested text/code spans. Review exposed trigger fast-path bypass and
alpha double paint; fixed both with failing regressions. An independent HTML parse
regression caught invalid P nesting from background layers; matching backgrounds
now clear layers and paint inline exactly once. Root background and page adaptive
text cases remain tested.

Ruling: numeric input buffers keyboard drafts and commits on blur/Enter. Invalid
bounds restore saved values visibly; moving a range past its previous To should
change To first. RED→GREEN keyboard regressions include -5.25 and -0.5; rejected
lower 200 followed by upper 300 cannot silently display an unsaved 200. Focused
review follow-up reports no remaining Important issues.

Local full suites: panel 145 files / 772 tests expected after final numeric cases;
runtime 156 file entries / 960 test entries passed (includes typecheck copies).
Standalone types/builds/lint are recorded in /private/tmp/conditional-colors-*.log.
Final exact panel results are appended after command completion. Existing renderer
unused/Fast Refresh warnings and native engine-control lint warnings remain.

Browser QA is pending: the isolated panel server started, but automatic approval
could not complete the runtime-server action because the approval service hit its
usage limit. The runtime action was not executed. No workaround bypassing approval
was attempted. Continue unaffected local checks; do not mark browser QA as passed.
The user additionally requested a V1 capability audit; see
../../react-template-v1-capability-audit.md. It identifies reuse and integration
gaps without introducing seven new subsystems or replacing AutoTable auth/forms.

Final local verification: panel145/772, runtime156/960 passed. Both standalone
TypeScript checks exited0. Both production builds to /private/tmp exited0.
Focused lint exited0 with warnings (engine-native buffered inputs and existing
renderer warnings). Fresh reviewer verified all Important fixes, no remaining
Important issues. Own isolated panel server was stopped via its session control;
no runtime server/browser was started after approval failed. Browser QA remains
unchecked. Changes remain uncommitted. V1 capability audit completed in the guide
linked above; broader V1 gaps are identified, not represented as implemented.
