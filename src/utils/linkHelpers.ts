import { Frontend } from "./api/container";

/**
 * Builds a URL from a link template by replacing placeholders with actual values
 * Supported placeholders:
 * - {{value}} → current field value
 * - {{_id}} → row ID
 * - {{row.FIELD_NAME}} → any other field from the row
 * - {{FIELD_NAME}} → any other field from the row
 * 
 * @param frontend - Frontend configuration containing linkTemplate
 * @param fieldValue - The current field's value
 * @param row - The entire row object
 * @returns The built URL string or null if template is invalid/missing
 */
export function buildLinkUrl(
  frontend: Frontend | undefined,
  fieldValue: any,
  row: any
): string | null {
  if (!frontend?.linkTemplate) {
    return null;
  }

  try {
    let url = frontend.linkTemplate;

    // Replace {{value}} with the field value
    url = url.replace(/\{\{value\}\}/g, String(fieldValue ?? ""));

    // Replace {{_id}} with row ID
    if (row?._id) {
      url = url.replace(/\{\{_id\}\}/g, String(row._id));
    }

    // Replace {{row.FIELD_NAME}} with corresponding field values
    const rowFieldPattern = /\{\{row\.([a-zA-Z0-9_]+)\}\}/g;
    url = url.replace(rowFieldPattern, (match, fieldName) => {
      return String(row?.[fieldName] ?? "");
    });

    const bareFieldPattern = /\{\{([a-zA-Z0-9_]+)\}\}/g;
    url = url.replace(bareFieldPattern, (match, fieldName) => {
      return String(row?.[fieldName] ?? match);
    });

    // Check if there are still unresolved placeholders
    if (url.includes("{{")) {
      console.warn("Unresolved placeholders in link template:", url);
      return null;
    }

    return url;
  } catch (error) {
    console.error("Error building link URL:", error);
    return null;
  }
}

/**
 * Gets the label text for a link
 * Uses linkLabelField if specified, otherwise falls back to the field value
 * 
 * @param frontend - Frontend configuration containing linkLabelField
 * @param fieldValue - The current field's value
 * @param row - The entire row object
 * @returns The label text to display
 */
export function getLinkLabel(
  frontend: Frontend | undefined,
  fieldValue: any,
  row: any
): string {
  if (frontend?.linkLabelField && row?.[frontend.linkLabelField]) {
    return String(row[frontend.linkLabelField]);
  }
  return String(fieldValue ?? "");
}
