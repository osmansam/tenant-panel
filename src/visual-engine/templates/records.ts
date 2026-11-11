import type { ValidationIssue, ValidationResult } from "../model/validation";
import { parseVisualTemplate, type VisualTemplate } from "./types";

export interface VisualTemplateRecord extends VisualTemplate {
  _id: string;
  description: string;
  category: string;
  tags: string[];
  containerStyle: Record<string, unknown>;
  thumbnailUrl: string;
  isActive: boolean;
}

export type VisualTemplateInput = Omit<VisualTemplateRecord, "_id">;

export function parseVisualTemplateRecord(
  input: unknown,
): ValidationResult<VisualTemplateRecord> {
  if (!isRecord(input)) return invalid("$", "record.object_required", "Template record must be an object");
  const template = parseVisualTemplate(input);
  const issues: ValidationIssue[] = template.success ? [] : [...template.issues];

  requiredString(input._id, "$._id", "record.id_required", "AutoTable record ID is required", issues);
  requiredString(input.description, "$.description", "record.description_required", "Description is required", issues, true);
  requiredString(input.category, "$.category", "record.category_required", "Category is required", issues);
  if (!Array.isArray(input.tags) || input.tags.some((tag) => typeof tag !== "string")) {
    issues.push(issue("$.tags", "record.tags_invalid", "Tags must be an array of strings"));
  }
  if (!isRecord(input.containerStyle)) {
    issues.push(issue("$.containerStyle", "record.container_style_invalid", "Container style must be an object"));
  }
  if (typeof input.thumbnailUrl !== "string") {
    issues.push(issue("$.thumbnailUrl", "record.thumbnail_invalid", "Thumbnail URL must be a string"));
  }
  if (typeof input.isActive !== "boolean") {
    issues.push(issue("$.isActive", "record.active_invalid", "Active state must be a boolean"));
  }
  if (issues.length > 0 || !template.success) return { success: false, issues };

  return {
    success: true,
    value: {
      ...template.value,
      _id: input._id as string,
      description: (input.description as string).trim(),
      category: (input.category as string).trim(),
      tags: [...(input.tags as string[])],
      containerStyle: structuredClone(input.containerStyle as Record<string, unknown>),
      thumbnailUrl: input.thumbnailUrl as string,
      isActive: input.isActive as boolean,
    },
    issues: [],
  };
}

export function templateToCreatePayload(
  input: VisualTemplateRecord | VisualTemplateInput,
): VisualTemplateInput {
  const { _id: _ignored, ...payload } = input as VisualTemplateRecord;
  return structuredClone(payload);
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}

function requiredString(
  value: unknown,
  path: string,
  code: string,
  message: string,
  issues: ValidationIssue[],
  allowEmpty = false,
) {
  if (typeof value !== "string" || (!allowEmpty && value.trim().length === 0)) {
    issues.push(issue(path, code, message));
  }
}

function issue(path: string, code: string, message: string): ValidationIssue {
  return { path, code, message };
}

function invalid(path: string, code: string, message: string): ValidationResult<never> {
  return { success: false, issues: [issue(path, code, message)] };
}
