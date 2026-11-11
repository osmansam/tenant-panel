# Visual Cell Sizing Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline with TDD, then one read-only final review per requesting-code-review. No implementation delegation.

**Goal:** Optionally fill the enclosing page cell per placed visual design.
**Architecture:** Placement prop outside reusable envelope; conflict-checked target merge; lightweight dialog; local runtime/root presentation override and scoped layout CSS.
**Tech Stack:** Existing React/TypeScript/TanStack Query/Vite/Vitest and CSS.
**Spec:** ../specs/2026-11-05-visual-cell-sizing-design.md

## Constraints
No dependencies, backend changes, commits/staging/reset, or loss of existing dirty work. Default remains authored design size. Do not scale text or change internal card layout. Cell size remains driven by existing grid and content.

## Review focus
Percent-height chains and auto-height mobile; multiple cell components/filter controls; save/theme/connection preserving placement settings; errors/concurrent edits; root sizing/proportional animation wrappers and data/action contexts.

## Task 1 — Implement optional placement fill
- [x] RED: merge/clear prop without document or library mutation; root sizing immutable override; dialog open/cancel/error/dirty lock; SSR runtime fill marker.
- [x] GREEN: `cellSizing.ts` both apps, target merge/type in panel, `CellSizingEditor.tsx`, placed page persistence integration, runtime VisualBlock/CSS and section preview.
- [x] Focused tests pass; no new networking or renderer model.

## Task 2 — Verify and document
- [x] Full suites, standalone tsc, focused lint, builds both apps.
- [x] Isolated browser save/reopen and computed bounding boxes (desktop/tall neighbor/siblings/mobile/natural restoration), no real user data edits.
- [x] Fresh read-only review; fix material findings with regression tests.
- [x] Update guide/evidence; stop isolated browser/servers.


## Ledger and completion evidence
Ruling: extend existing dirty workspaces, preserving prior uncommitted builder features. No git/index mutation or dependency install. Placement sizing is outside reusable envelope, and no new height API/viewport resizing was introduced.

RED: `/private/tmp/cell-sizing-{panel,runtime,ui}-red.log` demonstrated absent setting/root override/UI; repository readback regressions in `/private/tmp/cell-sizing-retention-red.log`; real-browser effect root stayed 58px in a 420px row and constrained effect-host overflow was inaccessible before fixes. One initial browser effect fixture used schemaVersion instead of version and was corrected before accepting the meaningful reproduction. Long-content fixture was reset between cases so natural content growth was not mistaken for constrained scrolling.

Fresh read-only review found missing root effect propagation and missing sizing readback confirmation. Both fixed: scoped root CSS traverses animation/effect hosts and clips only within a reachable root scroll container; repository compares effective canonical placement sizing against merged target. Supported root effects are background/overlay; content/interaction effects target text/buttons and retain their own authored behavior.

Panel final full suite: 151 files / 793 tests; runtime full suite: 168 entries / 1000 test entries (includes Vitest type-check project entries). Standalone tsc both apps and focused eslint have no errors. Production builds to `/private/tmp/cell-sizing-{panel,runtime}-final-build`. Browser results: `/private/tmp/cell-sizing-desktop-check.log`, `/private/tmp/cell-sizing-effect-green.log`, `/private/tmp/cell-sizing-layout-cases-final.log`, `/private/tmp/cell-sizing-save-reopen.log`. Desktop640x420, shared640x238, mobile content80px, constrained section scrollHeight954 vs clientHeight234, natural root320x160; font16px unchanged. Dialog persisted/reopened/cleared via real editor controls with in-memory API fixture.

Reviewer deferred exact browser layout and backend retention: browser cases above cover local rendering and mocked save/readback; actual production server retention and existing full-page-write atomicity remain outside this local test. No backend changes. Screenshots `/private/tmp/cell-sizing-{desktop,mobile,dialog}.png`. Own isolated browser and both preview servers stopped before final report.

## User-reported correction: visible main frame
User screenshots show Fill page cell saved but the visible Card remains narrow. Reproduced: cell/Section640x420, sole top-level Card320x160. Earlier verification measured only the Section. Correct fill semantics to also adapt a single top-level Card/Stack/Flex/Grid, while preserving nested node sizing and multi-child composition. Keep override ephemeral and reversible. Main frame animation/effect wrappers need a scoped renderer marker (main node and structural slot), rather than styling every nested full-height node. Constrained main-frame overflow must be reachable inside its own effect clipping host. No global header change without reproduction: fixture baseline card.top81 > sticky header.bottom57 with scrollY0.

- [ ] Watch sole-Card model and browser regression fail, plus constrained main effect overflow fail.
- [ ] Adapt single visible frame and scoped main wrapper/slot presentation; keep nested sizes/natural mode unchanged; update dialog copy.
- [ ] Check effect/animation, long content, disclosure, mobile, restoration and real visible card boundaries.
- [ ] Run both suites/types/lint/builds; one fresh review and material corrections; document and clean isolated browser/server.
