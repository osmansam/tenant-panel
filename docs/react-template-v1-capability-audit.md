# React Template V1 — capability audit

Reviewed 2026-11-04 across Tenant Panel, react-template and AutoTable Go.
These seven headings describe one application platform; they are not seven new
systems to implement. Preserve and connect the capabilities already present.

This is a source-backed scope review plus current frontend regression results,
not a claim that every possible end-to-end workflow has been exercised.

| V1 capability | Existing implementation to reuse | Remaining V1 work / proof |
| --- | --- | --- |
| Layout and composition | Native page sections/cells/tabs and the visual engine's section/grid/stack/flex/responsive nodes. | Regression-check representative desktop/mobile pages; retain both native and visual placements. |
| Data binding | Native table/pipeline/workflow bindings, parameter request boundaries; visual AutoTable repeaters and inline item fields on text/images/cards. | Table-selected records now populate placed visual detail panels through existing typed component outputs/parameters. Visual collection queries still use static filters/sort and page 1; page-filter-dependent collections remain to implement. |
| Conditional rendering | Table/visual-action hidden and disabled conditions, form field conditions, responsive visibility; new item-based conditional colors. | A consistent visual show/hide/disable editor and evaluation against shared page state, beyond action buttons and item styling. |
| Actions and forms | AutoTable CRUD/workflows; native configurable table/form actions; visual record buttons with form/confirm/link/workflow, hidden mappings and original record ID. | Verify the full workflow for each supported action. Add state/navigation/tab interactions only where missing; reuse current form/modal/mutation code. |
| Page state and interactions | PageRuntimeProvider/store, page filter values, table component outputs, parameter compiler/resolver and dependent request boundaries. | Table selection → visual details is now implemented, including fresh fields and hidden IDs for actions. Other visual controls still need a bridge into this system. Page variables are initialized but currently have no public mutable setter/binding resolver; form values/tab state are not a universal published visual context. |
| Permissions and reliability | Backend project/role/record/field access, mutation selectors/validation/transactions/idempotency; scoped sessions/visual queries and UI error handling; visual library revisions. | Prove UI and API behavior under denied access, failed saves, identity/project switches and concurrent/stale edits. Page PATCH uses an ID selector without an expected revision; library revision checks do not protect page edits. |
| Reusable application templates | Shared visual design library, fresh independent copies, 8 visual-only admin starters, and backend project cloning. | Complete working-page templates with schema/action/filter/output mappings and safe reference remapping. Visual starter blocks and full application pages are distinct reuse levels. |

## Reuse boundaries

AutoTable remains the authority for access, validation and executing operations.
Hiding a button in the UI is presentation; the API must still reject an
unauthorized operation. React Template handles the interaction, typed values,
loading/error feedback, correct project/record targeting and refreshing views.
Tenant Panel authors the same configuration consumed by the runtime.

Keep the existing page runtime as the shared state source. Do not introduce a
second visual-only store or separate HTTP/CRUD/form framework. The item context
already used by visual repeaters remains the current record; page filters and
component outputs should enter through the current typed parameter system.

## Practical completion order

1. Finish conditional visual colors and general show/hide/disable rules.
2. Connect visual filters, selection and buttons to the existing page-state and
   request-binding system. Close the gap between native tables and visual cards.
3. Turn one complete working page into a reusable page template; reuse the
   current component-copy/library mechanisms and remap all page references.
4. Use one end-to-end V1 acceptance scenario as the release gate, including the
   permissions and reliability cases below. Reuse existing tests where possible.

The first and second steps extend current components, not new subsystems.
Actions/forms already have a substantial working implementation; permissions
require verification and specific gap fixes, not another authorization system.

## A concrete V1 acceptance page

An inventory page has a table and responsive item cards showing the same schema.
A price/status filter affects the configured views. Price-based colors update per
record. Selecting an item opens a dependent detail/form view. A button opens an
edit or related create form with the correct undisplayed item._id and typed
prefills. Successful save refreshes all relevant views; failed submission retains
the entered data. A conditional element shows/hides or disables predictably.

Run the same workflow with an allowed user and a denied user; test both UI and
API access. Switch project/user and confirm old data/late responses cannot leak.
Verify duplicate-submit handling and make concurrent-edit behavior explicit:
reject stale writes where required, or document accepted last-write-wins behavior.
Save/duplicate the complete page, map it to another compatible schema, and verify
that component references, filters, outputs and actions remain correct.

This is a proposed release acceptance criterion, not a claim that the entire
scenario is already implemented.

## Source evidence

- Runtime `src/components/DynamicPageSections.tsx`, `src/components/DynamicPageRenderer.tsx`.
- Runtime `src/pageRuntime/{PageRuntimeProvider,pageRuntimeStore,pageBindingCompiler,pageParameterResolver,ComponentRequestBoundary,TableOutputPublisher}.*`.
- Runtime `src/components/forms/DynamicForm.tsx`, `src/utils/{dynamic,tableActions,formConfig}.ts`.
- Both apps `src/visual-engine/model/conditionalColors.ts`; runtime `src/visualBuilder/{VisualRecordActions,VisualBlock}.tsx` and `data/{useVisualCollections,collectionPlan}.ts`.
- Panel `src/visualBuilder/{componentLibrary,libraryRepository,adminTemplates}.ts` and `src/components/PageDesigner/ParameterBindingsEditor.tsx`.
- Backend `services/{management_authorization,record_access,dynamic_service}.go`, `models/page_runtime_validation.go`, `controllers/{pageController,visual_component_controller,projectController}.go`.

## Current verification limits

Conditional color model, renderer and authoring regressions pass locally,
including ordered boundaries, missing values, gradient/alpha handling, disclosure
labels and numeric keyboard entry. Full frontend suites, types/builds and focused
review are recorded in the conditional-colors implementation ledger. Browser QA
for this addition is pending because the automatic approval service could not
complete the isolated runtime-server approval after a usage-limit failure.
Existing browser verification of earlier action/refresh/template work remains
recorded in its respective ledgers. Backend access test cases were identified in
source; this audit does not mark unrun cross-app acceptance cases as passed.
