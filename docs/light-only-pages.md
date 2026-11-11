# Light-only page rendering — 2026-11-03

User requirement: react-template pages always appear in light mode, with no light/dark switch. Tenant Panel's section and gallery previews must match the published result.

Cause: output used saved defaultMode, allowing system dark preference to change theme tokens and design-preset palettes. Code blocks separately used hard-coded dark surfaces.

Change: page and preview boundaries fix the provider, ThemeScope default/palette and renderer context to light. Fixed providers ignore theme changes and suppress authored theme switch controls. Code blocks have scoped light surfaces and readable syntax colors. Authoring providers retain their existing optional theme switching. Rendering never changes the stored document/theme.

Validation: dark/system saved-theme regressions observed RED then GREEN for published rendering and both preview surfaces, including hidden segmented/select switches, light design presets and unchanged source data. Full runtime suite 128 files/716 tests passed; full Tenant Panel suite 134 files/714 tests passed. TypeScript and temporary-output production builds passed in both repos. ESLint: 0 errors (46 runtime warnings,95 panel warnings). Builds retain existing large-chunk warnings.

Isolated browser verified gallery preview, selected native page preview, and runtime page with OS dark preference plus html[data-theme=dark]. Both saved system and explicit dark settings still yielded light scope, section and code backgrounds, with no theme switch UI. Screenshots inspected; no live authenticated records were accessed or changed. Test fixture work stays in memory.
