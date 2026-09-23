# Tenant Form UI Representative Review

Review date: 2026-09-23

The representative form was rendered through the real `/page-preview/:pageId` route and the production `DynamicForm` component. Because the local API on port 3002 was unavailable, the browser session intercepted only the session and page-configuration requests and supplied the existing representative configuration shape. No fixture route, demo schema, production data, or browser mock was added to the application source.

## Build and test evidence

- `corepack yarn test --reporter=dot`: passed, 63 files and 327 tests with no type errors.
- `corepack yarn build`: passed with the existing stale Browserslist-data and large-chunk warnings.
- `corepack yarn lint`: exited 0 with six existing `react-refresh/only-export-components` warnings and no errors.
- `git diff --check`: passed.
- Focused responsive regression tests passed for the wide-layout breakpoint and narrow color-field sizing.
- Browser verification used Playwright against Vite at `http://127.0.0.1:3001`.

Screenshot evidence:

- `output/playwright/tenant-form-1440x900.png`
- `output/playwright/tenant-form-1024x768.png`
- `output/playwright/tenant-form-390x844.png`
- `output/playwright/tenant-form-320x568.png`

## Desktop acceptance

- **1440×900:** passed. The form is capped at 1200px, the primary and review sections align in a two-area layout, section borders/radii/padding are consistent, and the action footer has a distinct surface and primary action.
- **1024×768:** passed after an in-scope verification fix. Multi-area layouts now remain stacked until the `xl` breakpoint, preventing compound date/time/select controls from being compressed by an implicit second grid column.
- Text, number, select, date, time, month-year, color, checkbox, textarea, and file controls use the shared label and field presentation. React Select preserves its existing interaction model and uses semantic control styling.
- The browser DOM audit found no page-level horizontal overflow. Field controls keep a minimum 40px interactive height, and card focus rings are not clipped.
- Object-list add/edit/remove/calculation behavior and footer pending behavior are covered by the representative integration suite rather than persisted demo data.

## Mobile acceptance

- **390×844:** passed. Fields collapse to one column, card padding reduces to 16px, labels remain readable, and controls remain inside the viewport.
- **320×568:** passed after an in-scope verification fix. The color trigger now uses available width instead of enforcing a 160px minimum. A DOM overflow audit returned no element with meaningful horizontal overflow.
- The mobile date popover measured `left: 57`, `right: 387` in the 390px viewport and remained vertically inside the 844px viewport.
- Section headers wrap without overlapping content. Clear actions, compound time/month controls, and field messages remain operable at narrow widths.
- Submit sections stack below the main form below the wide-desktop breakpoint; footer controls retain logical ordering.

## Keyboard and accessibility checks

| Check | Result | Evidence |
| --- | --- | --- |
| Tab and Shift+Tab order | Pass | Browser focus moved from `name` to `email` and back in visual order. |
| Visible keyboard focus | Pass | The focused email control exposed the semantic 3px focus ring in computed styles. |
| Label activation | Pass | Clicking the checkbox label toggled the native checkbox from checked to unchecked. |
| Checkbox toggle | Pass | Browser check plus shared-field component test. |
| Select open/select/clear | Pass | React Select selected `Fulfilled` through keyboard input; its accessible status log announced the selection; clear shape is covered by tests. |
| Conditional field response | Pass | Selecting a non-draft status revealed the conditionally hidden field without remounting the form engine. |
| Date open/select/clear | Pass | Browser popover check plus serialized-date and clear callback tests. |
| Password reveal/hide | Pass | Shared-field test verifies `password` → `text` → `password` without changing the value. |
| Number step buttons | Pass | Component test verifies accessible increase control and preserved numeric callback. |
| File choose/remove | Pass | Component tests verify the original `File` callback and `null` removal callback. |
| Inline validation announcement | Pass | Empty required submission sets `aria-invalid` and produces `aria-live="polite"` messages. |
| Pending submission | Pass | Integration test verifies disabled submit state and `aria-busy="true"`. |
| Reduced motion | Pass | Browser emulation confirmed `prefers-reduced-motion: reduce`; the foundation adds no required motion-dependent interaction. |
| Stable IDs and descriptions | Pass | Field tests verify explicit/generated IDs and composed `aria-describedby` values. |

## Compatibility and payload checks

- The existing form engine remains the only form-state system. React Hook Form, Formik, Final Form, and equivalent competing systems were not added.
- React Select remains in place for relation, multiple, searchable, suggestion, numeric-value, and dependent-selection behavior.
- The compatibility adapter preserves current `isDisabled` and matching `disabledCondition` behavior as hidden fields. Hidden values remain in form state and submission payloads.
- Required conditions remain independent from visibility resolution.
- Scalar string/number select values and string/number arrays retain their existing formats without coercion.
- Date, time, hour, and month-year serialized formats remain `YYYY-MM-DD`, `HH:mm`, `HH:mm`, and `MM-YYYY` respectively.
- Relation invalidation visually clears dependent selections while preserving existing selection-source filtering.
- Upload callbacks continue to pass `File | null` without transforming the file.
- Object-list add/edit/remove, source-field mappings, calculations, summaries, and reset behavior are covered by integration tests.
- Create, create-many, and workflow tests verify their existing request-body shapes. Workflow payloads retain `formConfigRef`; no submission endpoint or callback contract changed.

## Dependency and license audit

Runtime dependencies intentionally introduced:

| Dependency/component source | Version | Use | License/notice |
| --- | --- | --- | --- |
| `clsx` | 2.1.1 | Conditional class composition | MIT; complete text in `third-party/licenses/clsx-MIT.txt` |
| `tailwind-merge` | 2.6.1 | Deterministic Tailwind class conflict resolution | MIT; complete text in `third-party/licenses/tailwind-merge-MIT.txt` |
| shadcn/ui design patterns | source adaptation only | Project-owned primitive patterns; no package installed | MIT; complete text in `third-party/licenses/shadcn-ui-MIT.txt` |
| Plus Jakarta Sans | notice retained; system fallback currently used | Approved typography asset/source attribution | SIL OFL 1.1; complete text in `third-party/licenses/plus-jakarta-sans-OFL-1.1.txt` |

Development-only dependencies intentionally introduced:

| Dependency | Version | License | Purpose |
| --- | --- | --- | --- |
| `@testing-library/dom` | 10.4.2 | MIT | DOM accessibility-oriented queries |
| `@testing-library/jest-dom` | 7.0.1 | MIT | DOM assertions |
| `@testing-library/react` | 16.3.3 | MIT | React component rendering/tests |
| `@testing-library/user-event` | 14.6.7 | MIT | Keyboard and pointer interaction tests |
| `jsdom` | 29.0.1 | MIT | Test DOM environment |

`yarn why` confirms the declared direct versions. The dependency diff contains no Radix package, form-state framework, or unrelated UI framework. No copyright notice is required beyond the bundled MIT/OFL texts and the package notices retained by the installed distributions.

## Known warnings outside this scope

- ESLint reports six pre-existing `react-refresh/only-export-components` warnings in unrelated files; there are no lint errors or new warnings from this slice.
- Browserslist reports stale `caniuse-lite` data during tests/build.
- The production bundle retains the existing large-chunk warning.
- Test output retains existing third-party warnings for duplicate Emotion loading and `react-input-mask` use of deprecated `findDOMNode`.
- The local API and WebSocket server on port 3002 were unavailable during visual review. Browser request interception was used only for the review session and is not part of application code.

## Approval gate

- [x] Shared tokens, primitives, field presentation, centralized exports, compatibility adapter, and one representative `DynamicForm` are implemented.
- [x] Desktop, tablet, mobile, keyboard, accessibility, compatibility, payload, dependency, and license checks are recorded.
- [x] Unrelated tenant-panel pages and the legacy `GenericAddEditPanel` were not redesigned.
- [ ] Product owner approves the representative visual result.
- [ ] Product owner authorizes a separate plan before any legacy form migration.
- [ ] Any future dialog primitive or changed disabled/read-only semantics receives explicit architectural approval before implementation.

Legacy form migration has not started. Approval of this representative result is required before a separate legacy migration plan is written.
