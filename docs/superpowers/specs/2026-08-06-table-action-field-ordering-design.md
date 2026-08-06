# Table Action Field Ordering

## Goal

Allow Page Designer users to reorder form fields within every Table Actions editor using up and down icon buttons.

## Scope

Ordering controls apply to create/add action fields, per-row action fields, and bulk-edit action fields. Each field keeps its complete configuration when moved. The first field cannot move up and the last field cannot move down.

## Design

Keep the existing persisted `formFields` array format; array position remains the display and submission order. Add a pure bounded array-move helper and action-specific state handlers that immutably replace the appropriate `formFields` array. Render accessible up/down icon buttons beside the existing field controls, with unavailable directions disabled.

## Validation

Unit tests cover moving up, moving down, boundaries, immutability, and preservation of field objects. The tenantPanel test suite and production build must pass.
