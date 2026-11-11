> Source-library architecture superseded by `2026-11-03-visual-library.md`. Cell/tab independent-copy insertion remains supported with the standalone backend library.

# Visual cell insertion implementation plan

> Execute inline with superpowers:executing-plans; the user already selected inline execution in this session.

Goal: add project visual designs through native page-cell Add and tab-child insertion as independent saved copies.
Architecture: small source/copy adapter, separate lazily mounted picker, minimal wiring into existing ComponentModal. Existing custom envelope renders without runtime changes.
Tech stack: React18, current UI controls, TanStack Query, Axios, existing visual document validation.
Spec: docs/superpowers/specs/2026-11-03-visual-cell-insertion-design.md

Constraints: preserve existing working changes and native save/draft behavior; no backend or runtime authoring changes; copy per page; project scope; stable internal node references; no new dependencies.

- [x] Task1: add adapter and picker. Observe tests failing for independent deep copy/fresh IDs, invalid envelopes, nested project design traversal and UI loading/empty/error/selection. Implement and run focused checks.
- [x] Task2: expose Visual component in native modal and Tab Panel child controls, conditional picker/no schema requirement, validated copy in existing save flow, existing visual child retention. Add actual PageDesigner integration tests, observe RED, implement then GREEN.
- [x] Task3: full tests, TypeScript, lint, temp-output build; browser cell insertion + page persistence + runtime rendering; one final source review and fix actionable findings with regression tests. Document usage and verification.

Review focus: loading/error must not submit stale selection; scope switches must not insert another project's design; save failure retains selected copy; imported designs stay independent and retain theme/node references; tab-child editing does not drop source envelopes or persist unrelated parent drafts.
