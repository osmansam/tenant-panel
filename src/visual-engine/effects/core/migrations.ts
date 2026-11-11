import type { ComponentDocument } from "../../model/document";
import { cloneJsonObject, isJsonObject, type EffectAttachment } from "../../model/effects";
import type { ComponentNode } from "../../model/nodes";
import type { EffectDiagnostic } from "./resolver";
import type { EffectRegistry, RegisteredEffect } from "./types";

export type EffectMigrationResult =
  | { success: true; attachment: EffectAttachment; changed: boolean }
  | { success: false; attachment: EffectAttachment; diagnostic: EffectDiagnostic };

export interface DocumentMigrationProposal {
  original: ComponentDocument;
  migrated: ComponentDocument;
  changedAttachmentIds: string[];
  diagnostics: EffectDiagnostic[];
}

export function migrateEffectAttachment(attachment: EffectAttachment, registration: RegisteredEffect): EffectMigrationResult {
  if (attachment.version === registration.schemaVersion) return { success: true, attachment: cloneAttachment(attachment), changed: false };
  if (attachment.version > registration.schemaVersion) return migrationFailure(attachment, "effect.migration_version_newer", "Effect attachment is newer than the registered schema");
  let current = cloneAttachment(attachment);
  while (current.version < registration.schemaVersion) {
    const migration = registration.migrations?.[current.version];
    if (!migration) return migrationFailure(attachment, "effect.migration_path_missing", "A complete effect migration path is unavailable");
    const sourceVersion = current.version;
    try {
      const migrated = migration(deepFreeze(cloneAttachment(current)));
      if (migrated.attachmentId !== attachment.attachmentId || migrated.effectId !== attachment.effectId) {
        return migrationFailure(attachment, "effect.migration_identity_invalid", "Effect migration changed attachment identity");
      }
      if (migrated.enabled !== attachment.enabled || JSON.stringify(migrated.metadata) !== JSON.stringify(attachment.metadata)) {
        return migrationFailure(attachment, "effect.migration_envelope_invalid", "Effect migration changed attachment metadata or enabled state");
      }
      if (migrated.version !== sourceVersion + 1 || !validEnvelope(migrated)) {
        return migrationFailure(attachment, "effect.migration_version_invalid", "Effect migration returned an invalid sequential version");
      }
      current = cloneAttachment(migrated);
    } catch {
      return migrationFailure(attachment, "effect.migration_failed", "Effect migration failed");
    }
  }
  return { success: true, attachment: current, changed: true };
}

export function proposeEffectDocumentMigration(document: ComponentDocument, registry: EffectRegistry): DocumentMigrationProposal {
  const migrated = structuredClone(document);
  const changedAttachmentIds: string[] = [];
  const diagnostics: EffectDiagnostic[] = [];
  visit(migrated.root, (attachment) => {
    const registration = registry.get(attachment.effectId);
    if (!registration || attachment.version === registration.schemaVersion) return attachment;
    const result = migrateEffectAttachment(attachment, registration);
    if (!result.success) { diagnostics.push(result.diagnostic); return attachment; }
    if (result.changed) changedAttachmentIds.push(attachment.attachmentId);
    return result.attachment;
  });
  return { original: document, migrated, changedAttachmentIds, diagnostics };
}

function visit(node: ComponentNode, transform: (attachment: EffectAttachment) => EffectAttachment): void {
  if (node.effects) node.effects = node.effects.map(transform);
  if ("children" in node) node.children.forEach((child) => visit(child, transform));
}

function validEnvelope(value: EffectAttachment): boolean {
  return typeof value.attachmentId === "string" && value.attachmentId.length > 0 && typeof value.effectId === "string" && value.effectId.length > 0 && Number.isInteger(value.version) && value.version > 0 && typeof value.enabled === "boolean" && isJsonObject(value.props) && (value.metadata === undefined || isJsonObject(value.metadata));
}

function cloneAttachment(value: EffectAttachment): EffectAttachment {
  return { ...value, props: cloneJsonObject(value.props), ...(value.metadata === undefined ? {} : { metadata: cloneJsonObject(value.metadata) }) };
}

function migrationFailure(attachment: EffectAttachment, code: string, message: string): EffectMigrationResult {
  return { success: false, attachment: cloneAttachment(attachment), diagnostic: { attachmentId: attachment.attachmentId, effectId: attachment.effectId, status: "unsupported-version", code, message } };
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object") {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}
