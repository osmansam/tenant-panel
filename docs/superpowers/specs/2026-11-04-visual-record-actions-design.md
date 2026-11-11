# Visual record actions

## Intent and authorization

The user wants generic action buttons in visual components, matching existing table actions. They explicitly declined a specific business workflow and asked us to continue based on the current table implementation. A card may display only name and price while retaining `_id` and other returned fields for edit, modal and other actions. Do not ask for another business example or restrict this to an Item/Order scenario.

## Data and architecture

The repeater already retains its complete fetched record in renderer context. Keep that record as data, without adding hidden text nodes, fetching it again, persisting live records in designs, or stringifying numbers/booleans. Button activation snapshots the clicked record. Only that card's record is passed; other cards and placements remain isolated.

Extend ButtonNode with optional generic host action `{name: string, config: JsonObject}`. Existing href/submit behavior remains when absent. The visual engine validates/clones bounded JSON action configuration, renders a real button when configured, and invokes an optional host callback with action, node id and current item. It does not import form, Axios, auth or project modules. Editor canvas and sample previews have no live host callback and cannot mutate data. The actual record action config uses name `record` and lives in the existing document, so library save/export/version/copy paths preserve it automatically. No envelope or document version change.

The frontend host interprets `record` config as `{schemaName, action: TableActionConfig, valueBindings?: Record<string, string[]>}`. Reuse current table action kinds create/edit/delete/update/link, form fields, conditions, defaults/constants, modal titles, layout and workflow submit settings. `defaults` is a table expansion shorthand, not a single visual-button operation. Restrict transport to existing project-scoped CRUD/workflow APIs; no arbitrary request URLs or scripts. Link actions use the existing safe URL policy.

`valueBindings` maps destination form/payload keys to own-property paths on the full `item`. `_id` is available even if absent from displayed elements or schema metadata. Keep numeric/boolean/array/object JSON values typed, copied and immutable; reject prototype-related keys/paths. Missing mapped values must produce a local error before opening/submitting rather than send a literal token. Edit/delete/update target the clicked record's original `_id`; visible form edits cannot retarget the mutation.

Mapped values plus action constants are split using existing visible-default/hidden-value helpers. Values whose keys are form fields prefill editable fields. Values outside the form are included in the submitted payload. Existing constants override mappings, and hidden values override submitted fields, matching table constant semantics. Edit initial values retain clicked record fields with mapped/constant overrides; create forms do not blindly copy the source record. No persistent component state, counters, input widgets, nested repeaters or saving live record snapshots are introduced in this milestone. Keeping arbitrary record fields satisfies the current request; future state features can build on the host callback.

## Authoring

When a Button is selected, a `Configure button action` host tool opens a workspace dialog. It provides a target schema (metadata or manual), operation, modal type, workflow submit settings, form fields, layout, conditions, constants and passed-value mappings. Reuse existing FormFieldEditor, ActionConstantValuesEditor, ActionSettingsTabs and conditions controls where practical. Schema fields can initialize form fields, omitting system `_id`/timestamps. A mapping picker includes `_id` and the repeater's source fields, with a manual path fallback for any additional returned field. Apply is one normal document-history import/update; cancel does not alter the document. Applying an action clears conflicting href/submit settings. Removing it restores an ordinary button without introducing navigation.

## Runtime

The visual host opens existing GenericAddEditPanel for form actions and the shared confirmation dialog for confirmation/delete actions, retaining configured layout, validation and schema select sources. Reuse buildFormInputs/buildFormKeys/useFormSelectionData, action constant helpers and useDynamicCrud's mutateAsync operations. Existing endpoint authorization remains in effect. Show pending/error locally, prevent duplicate submit, keep the modal and entered values on a failed request, close only on success, and refresh through the existing schema event/invalidation system. Local action errors must not replace unrelated page content.

GenericAddEditPanel currently resets/closes immediately after calling submitItem. Extend its submitItem contract to await a returned Promise before reset/close, preserving synchronous callers. Add a meaningful failure/success regression, since this is necessary to reuse the modal reliably.

For static buttons, create/workflow/link actions with constants may work without an item. Record-targeting operations require a valid clicked `_id`. Missing/unknown/malformed configuration is inert with a clear local error. No mutation occurs during validation, mount, canvas editing, sample preview or modal opening.

## Compatibility and verification

Keep old documents, ordinary links/submit buttons, existing table actions, independent copies, responsive layouts, light runtime, auth isolation and query deduplication intact. Test hidden id retention, per-card record isolation, typed mappings, source immutability, action save/copy/reopen, editor apply/cancel, no editor requests, runtime modal prefill/submit, pending/failed submit, and safe payload/URL handling. Use fixture-only browser APIs; do not modify the user's live records. Leave changes uncommitted.
