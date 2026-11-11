# Visual design gallery

Scope: replace name-only browsing with rendered preview cards in the standalone library and page insertion picker. Include project designs and this project's browser templates. Preserve independent copies, existing save/reload guards, project boundaries, and failure recovery. User clarified that ozmishow is only the UX reference: no ozmishow designs in Tenant Panel.

Plan: (1) reproduce missing visual browsing in integration tests; (2) shared searchable, categorized, paginated gallery with bounded inert thumbnails and expanded previews; (3) integrate library browsing and page selection; (4) run tests, type/lint/build and isolated browser visual checks; (5) final independent read-only review.

Continuing the authorized existing dirty feature workspace; no commit, publish, or unrelated edits. Ozmishow's saved designs and starter catalog are excluded from this gallery.

Shared interfaces: gallery selections carry source identity plus document/theme; library opens saved identities but clones browser templates into new drafts; page picker preserves backend stale-source validation and scopes every source to the current project.

Progress: investigation confirmed ozmishow uses rendered thumbnails in separate template galleries; panel only exposes saved names and text starter lists inside editor tools.

Implemented: shared gallery with real thumbnails (nine cards per page, lazy render, unique cloned IDs, inert canvas with effects disabled), named search/category controls, expanded preview dialog, saved-design opening, independent browser-template drafts, and native cell/tab/section selection. Existing saved-source refresh/error invalidation is retained; browser templates remain usable during server errors. Scope regression excludes ozmishow content and other projects' browser templates. Initial gallery tests observed four failures before implementation and passed afterward; nested thumbnail button regression observed RED then GREEN by separating the preview trigger from the rendered content.

Final review: one Important finding fixed — canvas rendering still loaded media despite inert previews. Real renderer regression observed RED with a background video element, then GREEN after replacing background video, video/audio/embed nodes, and scroll-story media with static posters/placeholders in the gallery's isolated copy. Source documents remain unchanged. No Critical findings.

Final: minor (deferred): a preview already open during a source refresh can retain its old snapshot. Reopen the preview to see refreshed content; picker revalidation prevents inserting that stale snapshot.

Review boundary: earlier backend/runtime/auth/copy-helper work is unchanged and previously reviewed. Parent verified the full suite and screenshots. Original optional ozmishow catalog inclusion was superseded by the user's explicit correction, and is absent from the final gallery.

Final validation (2026-11-03): 133 test files / 712 tests passed; TypeScript --noEmit passed; ESLint 0 errors / 95 warnings (existing shared-control/ported-engine warnings plus gallery native filter controls); temporary-output Vite production build passed with bundle-size warnings. Isolated browser flow passed: three own saved designs, no ozmishow source, large preview without selection, opening/updating the same saved identity, visual native section picker, independent insertion alongside a retained grid, mobile no horizontal overflow, media previews with no video/audio/iframe/source elements and unchanged saved source. Desktop/mobile screenshots inspected and retained in output/playwright/visual-gallery. No authenticated live records were accessed or changed.
