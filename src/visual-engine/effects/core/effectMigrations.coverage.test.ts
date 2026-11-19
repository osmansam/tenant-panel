import { expect, it } from "vitest";
import type { EffectAttachment } from "../../model/effects";
import type { ComponentDocument } from "../../model/document";
import { migrateEffectAttachment, proposeEffectDocumentMigration } from "./migrations";
import type { RegisteredEffect } from "./types";

const attachment: EffectAttachment = { attachmentId: "a", effectId: "test.effect", version: 1, enabled: true, props: { strength: 2 }, metadata: { author: "original" } };
const registration = (patch: Partial<RegisteredEffect> = {}) => ({ id: "test.effect", schemaVersion: 2, ...patch } as RegisteredEffect);
const upgrade = (value: EffectAttachment): EffectAttachment => ({ ...value, version: value.version + 1, props: { ...value.props, migrated: true } });

it("applies every migration step with immutable input and preserved identity", () => {
  const before = structuredClone(attachment);
  const result = migrateEffectAttachment(attachment, registration({ schemaVersion: 3, migrations: { 1: upgrade, 2: upgrade } }));
  expect(result).toMatchObject({ success: true, changed: true, attachment: { version: 3, props: { strength: 2, migrated: true }, metadata: { author: "original" } } });
  expect(attachment).toEqual(before);
  expect(result.attachment.props).not.toBe(attachment.props);
});
it("clones already-current attachments without changing their values", () => {
  const result = migrateEffectAttachment(attachment, registration({ schemaVersion: 1 }));
  expect(result).toEqual({ success: true, changed: false, attachment });
  expect(result.attachment).not.toBe(attachment);
  expect(result.attachment.metadata).not.toBe(attachment.metadata);
});
it.each([
  [registration({ schemaVersion: 0 }), "effect.migration_version_newer"],
  [registration(), "effect.migration_path_missing"],
  [registration({ migrations: { 1: value => ({ ...upgrade(value), attachmentId: "changed" }) } }), "effect.migration_identity_invalid"],
  [registration({ migrations: { 1: value => ({ ...upgrade(value), enabled: false }) } }), "effect.migration_envelope_invalid"],
  [registration({ migrations: { 1: value => ({ ...upgrade(value), metadata: {} }) } }), "effect.migration_envelope_invalid"],
  [registration({ migrations: { 1: value => ({ ...upgrade(value), version: 3 }) } }), "effect.migration_version_invalid"],
  [registration({ migrations: { 1: value => ({ ...upgrade(value), props: { unsafe: undefined } as never }) } }), "effect.migration_version_invalid"],
  [registration({ migrations: { 1: () => { throw new Error("migration unavailable"); } } }), "effect.migration_failed"],
  [registration({ migrations: { 1: value => { value.props.strength = 99; return upgrade(value); } } }), "effect.migration_failed"],
])("preserves the original attachment if a migration is unsafe or incomplete", (effect, code) => {
  const before = structuredClone(attachment);
  expect(migrateEffectAttachment(attachment, effect)).toMatchObject({ success: false, attachment, diagnostic: { code, attachmentId: "a", status: "unsupported-version" } });
  expect(attachment).toEqual(before);
});
it("proposes document migrations without modifying authors' live documents", () => {
  const doc: ComponentDocument = { version: 2, id: "doc", name: "Test", root: { id: "root", type: "section", effects: [attachment], children: [{ id: "text", type: "text", text: "Text", effects: [{ ...attachment, attachmentId: "unknown", effectId: "missing" }] }] } };
  const registry = { get: (id: string) => id === "test.effect" ? registration({ migrations: { 1: upgrade } }) : undefined };
  const proposed = proposeEffectDocumentMigration(doc, registry as never);
  expect(proposed.original).toBe(doc);
  expect(proposed.changedAttachmentIds).toEqual(["a"]);
  expect(proposed.diagnostics).toEqual([]);
  expect(proposed.migrated.root.effects?.[0].version).toBe(2);
  expect(doc.root.effects?.[0].version).toBe(1);
  const failed = proposeEffectDocumentMigration(doc, { get: () => registration() } as never);
  expect(failed.changedAttachmentIds).toEqual([]);
  expect(failed.diagnostics).toHaveLength(2);
});
