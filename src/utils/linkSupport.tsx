// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type LinkType = "external" | "internal" | "email" | "phone" | "file";

export interface FrontendConfig {
  displayName?: string;
  rowClassName?: Array<{ condition: string; className: string }>;
  rowKeyClassName?: Array<{ condition: string; className: string }>;
  invalidateKeys?: string[];
  linkTemplate?: string;
  linkLabelField?: string;
  linkType?: LinkType;
}

export interface Field {
  name: string;
  type: string;
  tag?: string;
  objectSchemaName?: string;
  enumList?: (string | number)[];
  isForceDelete?: boolean;
  unique?: boolean;
  isHashed?: boolean;
  isLoginCredential?: boolean;
  isSearchable?: boolean;
  children?: Field[];
  frontend?: FrontendConfig;
  populationSettings?: any;
  equation?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Builds a URL from a link template by replacing placeholders with actual values
 * Supported placeholders:
 * - {{value}} → current field value
 * - {{_id}} → row ID
 * - {{row.FIELD_NAME}} → any other field from the row
 */
export function buildLinkUrl(
  frontend: FrontendConfig | undefined,
  fieldValue: any,
  row: any
): string | null {
  if (!frontend?.linkTemplate) {
    return null;
  }

  try {
    let url = frontend.linkTemplate;

    url = url.replace(/\{\{value\}\}/g, String(fieldValue ?? ""));

    if (row?._id) {
      url = url.replace(/\{\{_id\}\}/g, String(row._id));
    }

    const rowFieldPattern = /\{\{row\.([a-zA-Z0-9_]+)\}\}/g;
    url = url.replace(rowFieldPattern, (match, fieldName) => {
      return String(row?.[fieldName] ?? "");
    });

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

// ============================================================================
// REACT CELL RENDERER
// ============================================================================

import React from "react";
import { useNavigate } from "react-router-dom"; // or Next.js: import { useRouter } from "next/router";

/**
 * Renders a table cell that can be a clickable link based on field configuration
 */
export function renderCell(field: Field, row: any): React.ReactNode {
  const fieldValue = row?.[field.name];
  const { frontend } = field;

  if (!frontend?.linkTemplate) {
    return <span>{String(fieldValue ?? "")}</span>;
  }

  const url = buildLinkUrl(frontend, fieldValue, row);
  const label = frontend.linkLabelField && row?.[frontend.linkLabelField]
    ? String(row[frontend.linkLabelField])
    : String(fieldValue ?? "");

  if (!url) {
    return <span>{label}</span>;
  }

  const linkType = frontend.linkType || "external";

  return <LinkRenderer url={url} label={label} linkType={linkType} />;
}

interface LinkRendererProps {
  url: string;
  label: string;
  linkType: LinkType;
}

function LinkRenderer({ url, label, linkType }: LinkRendererProps) {
  const navigate = useNavigate(); // React Router
  // For Next.js: const router = useRouter();

  if (linkType === "internal") {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(url); // React Router
      // For Next.js: router.push(url);
    };

    return (
      <a
        href={url}
        onClick={handleClick}
        style={{ color: "inherit", textDecoration: "underline", cursor: "pointer" }}
      >
        {label}
      </a>
    );
  }

  if (linkType === "external") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        style={{ color: "inherit", textDecoration: "underline" }}
      >
        {label}
      </a>
    );
  }

  return (
    <a href={url} style={{ color: "inherit", textDecoration: "underline" }}>
      {label}
    </a>
  );
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*

// Example 1: External link
const externalField: Field = {
  name: "website",
  type: "string",
  frontend: {
    linkTemplate: "https://{{value}}",
    linkType: "external"
  }
};

// Example 2: Internal route with row ID
const internalField: Field = {
  name: "productName",
  type: "string",
  frontend: {
    linkTemplate: "/urunler/{{_id}}",
    linkType: "internal"
  }
};

// Example 3: Email link
const emailField: Field = {
  name: "email",
  type: "string",
  frontend: {
    linkTemplate: "mailto:{{value}}",
    linkType: "email"
  }
};

// Example 4: Phone link
const phoneField: Field = {
  name: "phone",
  type: "string",
  frontend: {
    linkTemplate: "tel:{{value}}",
    linkType: "phone"
  }
};

// Example 5: File link
const fileField: Field = {
  name: "fileName",
  type: "string",
  frontend: {
    linkTemplate: "/uploads/{{value}}",
    linkType: "file"
  }
};

// Example 6: Custom label from another field
const customLabelField: Field = {
  name: "userId",
  type: "string",
  frontend: {
    linkTemplate: "/users/{{value}}",
    linkLabelField: "userName",
    linkType: "internal"
  }
};

// Example 7: Using multiple row fields in template
const complexField: Field = {
  name: "orderId",
  type: "string",
  frontend: {
    linkTemplate: "/orders/{{_id}}/items/{{row.itemId}}",
    linkType: "internal"
  }
};

// Usage in table component:
const TableCell = ({ field, row }: { field: Field; row: any }) => {
  return <>{renderCell(field, row)}</>;
};

*/
