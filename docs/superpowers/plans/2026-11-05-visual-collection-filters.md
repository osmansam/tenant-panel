# Visual Collection Filters Implementation Plan

> Inline execution using superpowers:executing-plans and TDD; preserve dirty checkouts.

**Goal:** Author supported AutoTable comparison/range filters in the visual builder and execute them correctly.
**Architecture:** Extend existing v2 source operators and typed collection planning, reuse table-source query serializer; mirror model/parser changes in both engines. Inspector stays Tenant Panel-only.
**Spec:** ../specs/2026-11-05-visual-collection-filters-design.md

## Review focus
Strict vs inclusive bounds/negative decimals, date UTC-day semantics, mixed duplicate fields silently overridden by transport/backend, effective-request cache identities, typed authoring and backward compatibility, backend narrow float range precision.

## Task 1 — Supported comparison transport/model
- [x] RED: all four comparisons and dates parse/roundtrip and encode; paired bounds repeated without loss, stable identity; invalid types/duplicate directions/empty ranges reject. Backend exact narrow float ranges remain AND.
- [x] GREEN: both models/validation/planners, runtime collectionFetch grouping; exact backend bound comparison.
- [x] Focused frontend and backend filter tests pass.

## Task 2 — Authoring and verification
- [x] RED: field-aware operator choices, preserved negative decimal keyboard entry, two bounds authored/saved, date input validation.
- [x] GREEN: CollectionDataInspector buffered value control/type-aware options/help.
- [x] Full frontend suites/types/lint/builds; focused fresh review and necessary regression fixes; isolated browser authoring/request checks; update guide/evidence and clean up own tools.

## Ledger
Pre-flight: table-source already supports comparison prefixes and repeated parameters. Existing runtime planner rejects duplicates and old fetch object would overwrite them; both need coordinated change. No custom Mongo expression syntax or arbitrary filters. Source document keys remain original; effective descriptor key canonicalizes executable semantics. Date normalization is UTC midnight in backend, so author exact calendar days only. No commits/staging.


## Completion evidence
- RED logs: `/private/tmp/visual-filters-{runtime,backend,ui}-red.log`; existing code rejected comparisons and overwrote bounds, and narrow strict decimal ranges became OR.
- Panel full suite: 149 files / 786 tests; runtime final full suite: 166 file entries / 994 test entries (includes Vitest type-check project entries). Both standalone TypeScript checks pass. Focused lint has no errors (one native-input advisory consistent with the visual engine's inspector controls).
- Production builds pass for both apps in `/private/tmp/visual-filters-panel-build` and `/private/tmp/visual-filters-runtime-final-build`.
- Backend `go test ./utils` passes with writable cache and loopback access for existing httptest servers; added exact date equality/date bounds, narrow float, negative decimal, large integer and weaker-bound regressions.
- Fresh read-only review found two Important regressions: inherited property names in request accumulator and float64 rounding of large integer bounds. Both reproduced RED and corrected with regression tests. Backend retains inclusive-bound priority used by existing multi-bound requests; a weaker strict bound cannot turn an inclusive single-value range into OR.
- Browser authoring saved price gte -0.5 / lt 3.25 plus date eq 2026-11-01 through normal Save; runtime request retained both price parameters plus explicit date prefix and displayed exactly Live product 2 and Live product 3. Fixtures stayed in memory; no user data was changed. `/private/tmp/visual-filters-browser-runtime.log` contains result. Screenshots: `/private/tmp/visual-filters-{authoring,runtime}.png`.
- Review's deferred live browser check is covered by the fixture check above. Deployed Mongo persistence remains outside this local verification; actual Go parser tests validate generated BSON. Isolated browser and both preview servers stopped. No git mutations.
