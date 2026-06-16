import { useNavigate } from "react-router-dom";
import { useCurrentProject } from "../hooks/useCurrentProject";
import useTenant from "../hooks/useTenant";
import { Field, Frontend } from "../utils/api/container";
import { buildLinkUrl, getLinkLabel } from "../utils/linkHelpers";

interface LinkCellProps {
  field: Field;
  row: any;
  linkConfig?: Frontend;
}

/**
 * Renders a table cell that can be a clickable link based on field configuration
 * Supports multiple link types: external, internal, email, phone, file
 */
export function LinkCell({ field, row, linkConfig }: LinkCellProps) {
  const navigate = useNavigate();
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();
  const fieldValue = row?.[field.name];
  const frontend = linkConfig ?? field.frontend;

  // If no link template is configured, render plain value
  if (!frontend?.linkTemplate) {
    return <span>{String(fieldValue ?? "")}</span>;
  }

  const url = buildLinkUrl(frontend, fieldValue, row);
  const label = getLinkLabel(frontend, fieldValue, row);

  // If URL building failed, render plain value
  if (!url) {
    return <span>{label}</span>;
  }

  const linkType = frontend.linkType || "external";
  const isTenantProjectPath = /^\/t\/[^/]+\/p\/[^/]+/.test(url);
  const scopedPath =
    currentTenant?.slug && currentProject?.slug
      ? `/t/${currentTenant.slug}/p/${currentProject.slug}${
          url.startsWith("/") ? url : `/${url}`
        }`
      : url.startsWith("/")
        ? url
        : `/${url}`;
  const internalPath =
    linkType === "internal" && !isTenantProjectPath
      ? scopedPath
      : url;
  const href =
    linkType === "internal"
      ? internalPath
      : linkType === "email" && !url.startsWith("mailto:")
      ? `mailto:${url}`
      : linkType === "phone" && !url.startsWith("tel:")
        ? `tel:${url}`
        : url;

  // Handle internal navigation using React Router
  if (linkType === "internal") {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(internalPath);
    };

    return (
      <a
        href={href}
        onClick={handleClick}
        className="text-blue-500 hover:text-blue-800  cursor-pointer"
      >
        {label}
      </a>
    );
  }

  // Handle external links
  if (linkType === "external") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 hover:text-blue-800 "
      >
        {label}
      </a>
    );
  }

  // Handle email, phone, and file links
  return (
    <a href={href} className="text-blue-500 hover:text-blue-800 ">
      {label}
    </a>
  );
}
