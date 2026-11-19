# ADR 0003: Versioned visual documents at the host boundary

Status: Accepted

## Context

The panel's editor and runtime renderer must share authored structure without
persisting React components or making saved content depend on editor UI state.

## Decision

Use the JSON `ComponentDocument` in `src/visual-engine/model/document.ts` (versions
1 and 2, a section root, and section/navbar/footer kinds). The model, capabilities,
validation and migrations live in `src/visual-engine/model`; editor, renderer,
operations, theme and persistence modules consume that model.

The management host stores `{ document, theme? }` in a custom component's
`props.visualBuilder`. `src/visualBuilder/pageAdapter.ts` migrates and validates
incoming documents/themes, preserves unrelated page structure, and rejects
ambiguous or changed targets. `src/visualBuilder/libraryRepository.ts` validates
API responses and uses revisions to detect conflicting library saves. Placement
copies library content; existing placements are independent.

## Consequences

Add model validation, migration and renderer support together when changing
stored content. Coordinate compatibility with `react-template`; passing the
panel type-check alone does not establish runtime compatibility. Keep tenant and
project scoping in host repositories, and keep editor-only state outside saved
documents. Never bypass validation by storing arbitrary executable content.
