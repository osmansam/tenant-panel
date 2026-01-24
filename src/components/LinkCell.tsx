import { useNavigate } from "react-router-dom";
import { Field } from "../utils/api/container";
import { buildLinkUrl, getLinkLabel } from "../utils/linkHelpers";

interface LinkCellProps {
  field: Field;
  row: any;
}

/**
 * Renders a table cell that can be a clickable link based on field configuration
 * Supports multiple link types: external, internal, email, phone, file
 */
export function LinkCell({ field, row }: LinkCellProps) {
  const navigate = useNavigate();
  const fieldValue = row?.[field.name];

  // Confirmed available user info:
  // console.log("LinkCell User Access:", user);
  const { frontend } = field;

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

  // Handle internal navigation using React Router
  if (linkType === "internal") {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(url);
    };

    return (
      <a
        href={url}
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
        href={url}
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
    <a href={url} className="text-blue-500 hover:text-blue-800 ">
      {label}
    </a>
  );
}
