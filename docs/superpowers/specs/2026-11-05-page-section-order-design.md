# Page-level section order

Add Move up / Move down buttons beside each section in Tenant Panel's page Structure list. This explicit keyboard/touch-friendly control is the implementation choice; drag-and-drop is unnecessary for the requested ordering capability. Include native grids, visual sections and preserved top-level component/tab sections in one order. Save Page persists the draft order through the existing save path; no backend/runtime schema change or immediate write.

Use the same stable `order ?? 0` sorting as React Template. Move by displayed position, then normalize every top-level order to 0..n-1 and retain IDs, nested configuration, bindings and page metadata. First/last buttons are disabled. Preserve the selected grid or visual across reorder; following edits/deletes must target that same section. Re-derive native grid source-slot tags from the newly ordered full page, preserving later grid/visual merges. Existing standalone grid-only designer can reorder its local array; mixed pages require the full-page callback.

Preserve dirty working copies and all unrelated work; no git staging/commits. Cover reordered mixed documents, legacy flat grids, duplicate/missing orders, boundaries, selection retention, subsequent native edits and parent Save Page payload. Use browser fixture to verify actual Structure controls and saved order.
