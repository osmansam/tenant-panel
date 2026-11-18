# Tenant panel readiness fixes implementation plan

**Goal:** Resolve the reported auth failures and prevent test/build/size regressions.
**Architecture:** Reuse existing auth mutations, handle callback errors within the callback component, and generate bounded lazy icon groups using a Vite plugin.
**Tech stack:** React, TypeScript, TanStack Query, Vite, Vitest, Yarn, GitHub Actions.
**Spec:** ../specs/2026-11-17-readiness-fixes-design.md

- [x] Reproduce logout and OAuth failures with regression tests.
- [x] Connect Sidebar to useTenantLogout; retain retry context on failure and clear identity/cache after both scopes succeed. Show OAuth recovery and guard single-use exchanges.
- [x] Verify successful and failed logout, including malformed workspace storage, and callback failures/StrictMode.
- [x] Replace namespace icon imports with bounded lazy groups; test registry coverage, group bounds, runtime loading and unknown names.
- [x] Add a local release check, 2 MB minified chunk budget and a CI workflow that runs it with an immutable install.
- [x] Run all tests, lint, production build, bundle gate and review the diff.

Review focus: partial logout, malformed cache, duplicate OAuth exchanges, missing icon names, clean CI dependency installs, and honest distinction between adding a CI check and enforcing hosted deployment policy.


Review found an in-flight refresh race that could restore cookies after logout.
Added management session request coordination in axiosClient and deferred-response
regressions for refresh ordering, blocking new session changes, pending project
switches and retry after failed logout. Also verified all 31,805 installed icon
exports across 20 supported families and placed logout errors inside the mobile
dialog. A clean immutable Yarn 4.5.0 install passed using the local dependency cache.

Review ruling: revoke project scopes before tenant logout, rather than concurrently.
This keeps tenant expiry handling from discarding failed project logout context.
Deferred project response and failed-project/root-not-called tests cover the ordering.

Final verification: `corepack yarn release:check` exited 0: 160 test files,
847 tests passing, TypeScript/build passing, lint with 0 errors (117 existing
warnings), and the largest minified JavaScript chunk at 1,889,429 bytes under
the 2,000,000-byte budget. Independent review approved with no remaining
Important/Critical findings. Vite still reports chunks above its 500 kB warning
threshold; further optimization remains possible. No deployment or hosted
branch-protection changes were performed.
