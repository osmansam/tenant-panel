# Visual library and section insertion plan

Goal: reusable visual designs independent of pages, inserted as visible native sections or cell/tab components.
Spec: docs/superpowers/specs/2026-11-03-visual-library-design.md
Execute inline; retain all previous user/feature working changes. No real project records are modified during verification.

1. Backend model/repository/controller/routes for project visual-components GET/POST/PUT. Watch validation/revision/project-scope/auth tests RED then GREEN. Preserve raw JSON and use strict existing permissions.
2. Frontend lossless library repository and standalone design workspace with no page API dependence. Retain fixed-target copy editor and explicit Save copy to library. Add request/refresh timeouts. Cover independence, conflicts, no-pages authoring and failed reads/saves.
3. Mixed Structure entries and Grid/Visual Add menu. Add picker dialog, read-only visual preview, edit/remove section actions and full-page persistence. Switch cell/tab picker to library. Tests cover ordering, existing grids, independent insertion, empty library and draft protection.
4. Full relevant Go/frontend suites, tsc/lint/build, isolated browser library create/save -> native visual section -> runtime render, one final source review, fix actionable regressions and document exact usage.

Review focus: runtime credentials cannot manage library; project/revision isolation and opaque JSON; authoring works with zero pages and no page selector; mixed grid/visual ordering and saves retain all metadata; repeated source use produces independent DOM/runtime identities; save/refetch/timeout failures retain drafts.
