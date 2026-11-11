import type { SVGProps } from "react";
import type { NodeType } from "../model";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 16, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ChevronIcon({ open, ...props }: IconProps & { open: boolean }) {
  return (
    <Icon {...props} style={{ transform: open ? "rotate(90deg)" : undefined, transition: "transform 120ms ease" }}>
      <path d="M6 3.5 10.5 8 6 12.5" />
    </Icon>
  );
}

export function DotsIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" stroke="none">
      <circle cx="3.5" cy="8" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="12.5" cy="8" r="1.25" />
    </Icon>
  );
}

export function UndoIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 5 3 8l3 3" />
      <path d="M3 8h6.5a3.5 3.5 0 0 1 0 7H8" />
    </Icon>
  );
}

export function RedoIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m10 5 3 3-3 3" />
      <path d="M13 8H6.5a3.5 3.5 0 0 0 0 7H8" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="7" cy="7" r="4.25" />
      <path d="m10.5 10.5 3 3" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4 4 8 8M12 4l-8 8" />
    </Icon>
  );
}

export function ReplayIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13 8A5 5 0 1 1 8 3h1.5" />
      <path d="M7.5 1.5 9.5 3 7.5 4.5" />
    </Icon>
  );
}

export function PanelRightIcon({ collapsed, ...props }: IconProps & { collapsed: boolean }) {
  return (
    <Icon {...props}>
      <rect x="2" y="3" width="12" height="10" rx="1.5" />
      <path d="M10 3v10" />
      {collapsed ? null : <rect x="10" y="3" width="4" height="10" rx="1.5" fill="currentColor" stroke="none" opacity="0.35" />}
    </Icon>
  );
}

export function NodeTypeIcon({ type, ...props }: IconProps & { type: NodeType }) {
  switch (type) {
    case "section":
      return <Icon {...props}><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M2 6.5h12" /></Icon>;
    case "grid":
      return <Icon {...props}><rect x="2" y="2" width="5" height="5" rx="1" /><rect x="9" y="2" width="5" height="5" rx="1" /><rect x="2" y="9" width="5" height="5" rx="1" /><rect x="9" y="9" width="5" height="5" rx="1" /></Icon>;
    case "stack":
      return <Icon {...props}><rect x="3" y="2" width="10" height="3.5" rx="1" /><rect x="3" y="10.5" width="10" height="3.5" rx="1" /><path d="M8 6.5v3" /></Icon>;
    case "flex":
      return <Icon {...props}><rect x="2" y="4.5" width="4" height="7" rx="1" /><rect x="10" y="4.5" width="4" height="7" rx="1" /><path d="M6.5 8h3" /></Icon>;
    case "slot":
      return <Icon {...props}><rect x="2.5" y="3" width="11" height="10" rx="1.5" /><path d="M5 6h6M5 9h4" /></Icon>;
    case "disclosure":
      return <Icon {...props}><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M4.5 6h7M4.5 9h4" /></Icon>;
    case "accordion":
      return <Icon {...props}><rect x="2" y="2" width="12" height="5" rx="1" /><rect x="2" y="9" width="12" height="5" rx="1" /></Icon>;
    case "tabs":
      return <Icon {...props}><path d="M2 5h4V3h4v2h4M2 5v8h12V5" /><path d="M4 8h8" /></Icon>;
    case "sidebar":
      return <Icon {...props}><rect x="2" y="2" width="12" height="12" rx="1.5" /><path d="M6 2v12M3.5 5h1M3.5 8h1M8 5h4M8 8h4" /></Icon>;
    case "infinite-slider":
      return <Icon {...props}><rect x="5" y="3" width="6" height="10" rx="1.5" /><path d="M2 5v6m12-6v6M1 8h2m10 0h2" /></Icon>;
    case "scroll-story":
      return <Icon {...props}><rect x="2" y="2.5" width="12" height="11" rx="1.5" /><path d="M4 5.5h8M4 8h8M4 10.5h5" /><path d="m10.5 9.5 1.5 1.5-1.5 1.5" /></Icon>;
    case "scroll-scene":
      return <Icon {...props}><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M5 6.5h6M5 9.5h4" /></Icon>;
    case "repeater":
      return <Icon {...props}><path d="M4 4h8M4 8h8M4 12h8" /><path d="m2 3 1 1-1 1m0 2 1 1-1 1m0 2 1 1-1 1" /></Icon>;
    case "card":
    case "expandable-card":
      return <Icon {...props}><rect x="2" y="2.5" width="12" height="11" rx="2" /><path d="M4.5 6h7M4.5 9h5" /></Icon>;
    case "overlay":
      return <Icon {...props}><rect x="2" y="2" width="10" height="10" rx="1" /><rect x="5" y="5" width="9" height="9" rx="1" /></Icon>;
    case "form":
      return <Icon {...props}><rect x="2" y="2" width="12" height="12" rx="1.5" /><path d="M5 5h6M5 8h6M5 11h4" /></Icon>;
    case "input":
      return <Icon {...props}><rect x="2" y="5" width="12" height="6" rx="1" /><path d="M5 8h6" /></Icon>;
    case "textarea":
      return <Icon {...props}><rect x="2" y="3" width="12" height="10" rx="1" /><path d="M5 6h6M5 9h4" /></Icon>;
    case "select":
      return <Icon {...props}><rect x="2" y="4" width="12" height="8" rx="1" /><path d="m10.5 7 1.5 1.5 1.5-1.5" /></Icon>;
    case "checkbox":
      return <Icon {...props}><rect x="2.5" y="2.5" width="11" height="11" rx="1.5" /><path d="m5 8 2 2 4-4" /></Icon>;
    case "heading":
      return <Icon {...props}><path d="M3.5 3v10M10.5 3v10M3.5 8h7" /></Icon>;
    case "text":
      return <Icon {...props}><path d="M3 4h10M3 8h10M3 12h6" /></Icon>;
    case "code":
      return <Icon {...props}><path d="m6 4-4 4 4 4M10 4l4 4-4 4" /></Icon>;
    case "image":
    case "image-comparison":
      return <Icon {...props}><rect x="2" y="3" width="12" height="10" rx="1.5" /><circle cx="6" cy="6.5" r="1.25" /><path d="m2.5 12 3.5-3.5 2.5 2.5 2-2 3 3" /></Icon>;
    case "button":
      return <Icon {...props}><rect x="2" y="5" width="12" height="6" rx="3" /><path d="M6 8h4" /></Icon>;
    case "icon":
      return <Icon {...props}><path d="m8 2 1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5Z" /></Icon>;
    case "badge":
      return <Icon {...props}><rect x="2" y="4" width="12" height="8" rx="4" /><path d="M5 8h6" /></Icon>;
    case "link":
      return <Icon {...props}><path d="M6.5 10 5 11.5a2.1 2.1 0 0 1-3-3l2-2a2.1 2.1 0 0 1 3 0M9.5 6 11 4.5a2.1 2.1 0 0 1 3 3l-2 2a2.1 2.1 0 0 1-3 0M6 10l4-4" /></Icon>;
    case "avatar":
      return <Icon {...props}><circle cx="8" cy="5.5" r="2.5" /><path d="M3 14a5 5 0 0 1 10 0" /></Icon>;
    case "list":
      return <Icon {...props}><path d="M5 4h8M5 8h8M5 12h8" /><circle cx="2.5" cy="4" r=".5" /><circle cx="2.5" cy="8" r=".5" /><circle cx="2.5" cy="12" r=".5" /></Icon>;
    case "stat":
      return <Icon {...props}><path d="M3 13V9h3v4M7 13V5h3v8M11 13V2h3v11" /></Icon>;
    case "rating":
      return <Icon {...props}><path d="m8 2 1.8 3.7 4.2.6-3 2.9.7 4.1L8 11.4l-3.7 1.9.7-4.1-3-2.9 4.2-.6Z" /></Icon>;
    case "quote":
      return <Icon {...props}><path d="M3 5h4v4H4l-1 3M9 5h4v4h-3l-1 3" /></Icon>;
    case "divider":
      return <Icon {...props}><path d="M2 8h12" /></Icon>;
    case "video":
      return <Icon {...props}><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="m6.5 6 4 2.5-4 2.5Z" /></Icon>;
    case "audio":
      return <Icon {...props}><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M5 9.5c1-1.5 1-4 0-3M8 10.5c1.2-2 1.2-6 0-4.5" /><circle cx="11" cy="8" r="1.5" /></Icon>;
    case "embed":
      return <Icon {...props}><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="m6.5 6-2 2 2 2M9.5 6l2 2-2 2" /></Icon>;
    case "table":
      return <Icon {...props}><rect x="2" y="2.5" width="12" height="11" rx="1" /><path d="M2 6h12M2 9.5h12" /></Icon>;
    case "progress":
      return <Icon {...props}><rect x="2" y="6" width="12" height="4" rx="2" /><path d="M2.5 6h6v4h-6Z" fill="currentColor" stroke="none" /></Icon>;
    case "steps":
      return <Icon {...props}><circle cx="3" cy="3.5" r="1.5" /><circle cx="3" cy="8.5" r="1.5" /><circle cx="3" cy="13.5" r="0.75" /><path d="M6.5 3.5h7M6.5 8.5h7M6.5 13.5h7" /></Icon>;
    case "timeline":
      return <Icon {...props}><circle cx="4" cy="4" r="1.25" /><circle cx="4" cy="12" r="1.25" /><path d="M4 5.5V10.5M7 3.5h7M7 12h7" /></Icon>;
    case "alert":
      return <Icon {...props}><path d="M8 2 15 14H1L8 2Z" /><path d="M8 7v3M8 12h0.01" /></Icon>;
    case "tags":
      return <Icon {...props}><rect x="2" y="3" width="5" height="10" rx="1.5" /><rect x="9" y="3" width="5" height="10" rx="1.5" /></Icon>;
    case "kbd":
      return <Icon {...props}><rect x="2" y="4" width="12" height="8" rx="1" /><path d="M4.5 7h.01M7 7h.01M9.5 7h.01M12 7h.01M5.5 9.5h5" /></Icon>;
    case "bar-chart":
      return <Icon {...props}><path d="M3 13V8h2.5v5M6.5 13V4H9v9M10 13V6.5h2.5V13" /><path d="M2 13.5h12" /></Icon>;
    case "sparkline":
      return <Icon {...props}><path d="m2 11 3-4 2.5 2.5L11 4l3 4" /></Icon>;
    case "site-logo":
      return <Icon {...props}><rect x="2" y="3" width="12" height="10" rx="1.5" /><circle cx="6" cy="6.5" r="1.25" /><path d="m2.5 12 3.5-3.5 2.5 2.5 2-2 3 3" /></Icon>;
    case "site-name":
    case "navigation-menu":
    case "footer-links":
      return <Icon {...props}><path d="M3 4h10M3 8h10M3 12h6" /></Icon>;
    case "language-switcher":
      return <Icon {...props}><circle cx="8" cy="8" r="6" /><path d="M2 8h12M8 2c2 2 2 10 0 12M8 2c-2 2-2 10 0 12" /></Icon>;
    case "theme-switcher":
      return <Icon {...props}><path d="M8 2a6 6 0 1 0 6 6 4.5 4.5 0 0 1-6-6Z" /><path d="M8 2v12" /></Icon>;
    case "menu-toggle":
      return <Icon {...props}><path d="M3 4h10M3 8h10M3 12h10" /></Icon>;
    case "menu-panel":
      return <Icon {...props}><rect x="2" y="2" width="12" height="12" rx="1.5" /><path d="M9 2v12" /></Icon>;
    case "copyright":
      return <Icon {...props}><circle cx="8" cy="8" r="6" /><path d="M10 6.5a2.5 2.5 0 1 0 0 3" /></Icon>;
  }
}
