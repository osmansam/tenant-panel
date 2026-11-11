import type {
  ComponentDocument,
  ComponentNode,
  StyleSpec,
} from "../visual-engine/model";
import { DEFAULT_SITE_THEME } from "../visual-engine/theme/defaults";
import type { VisualBlockValue } from "./types";

export interface AdminTemplate {
  id: string;
  name: string;
  heading: string;
  description: string;
  category:
    | "Dashboard"
    | "Navigation"
    | "Records"
    | "Profiles"
    | "Details"
    | "Commerce"
    | "Activity"
    | "Workflows"
    | "Notices"
    | "Empty states";
  value: VisualBlockValue;
}

const theme = structuredClone(DEFAULT_SITE_THEME);
theme.defaultMode = "light";
Object.assign(theme.palettes.light, {
  primary: "#2563eb",
  "primary-deep": "#1d4ed8",
  "primary-soft": "#eff6ff",
  ring: "#2563eb",
  accent: "#2563eb",
  "accent-foreground": "#ffffff",
  border: "#e2e8f0",
});

function kit(prefix: string) {
  let index = 0;
  const id = () => `${prefix}-${++index}`;
  const text = (value: string, muted = true): ComponentNode => ({
    id: id(),
    type: "text",
    text: value,
    style: {
      color: { text: muted ? "text-muted" : "text" },
      typography: { size: "sm", leading: "relaxed" },
    },
  });
  const heading = (value: string, large = false): ComponentNode => ({
    id: id(),
    type: "heading",
    level: large ? 2 : 3,
    text: value,
    style: {
      typography: {
        size: large ? "2xl" : "lg",
        weight: "semibold",
        leading: "snug",
      },
      color: { text: "text" },
    },
  });
  const stack = (
    children: ComponentNode[],
    gap: "sm" | "md" | "lg" = "md",
  ): ComponentNode => ({
    id: id(),
    type: "stack",
    direction: "column",
    alignment: "stretch",
    distribution: "start",
    wrap: false,
    gap,
    style: { sizing: { width: "full" } },
    children,
  });
  const row = (children: ComponentNode[]): ComponentNode => ({
    id: id(),
    type: "flex",
    direction: "row",
    alignment: "center",
    distribution: "between",
    wrap: true,
    gap: "md",
    style: { sizing: { width: "full" } },
    children,
  });
  const button = (label: string, secondary = false): ComponentNode => ({
    id: id(),
    type: "button",
    label,
    style: {
      color: {
        background: secondary ? "surface" : "primary",
        text: secondary ? "text" : "primary-foreground",
      },
      border: {
        radius: "md",
        width: "hairline",
        color: secondary ? "border" : "primary",
      },
      spacing: { paddingX: "md", paddingY: "sm" },
      typography: { size: "sm", weight: "medium" },
    },
  });
  const badge = (
    value: string,
    tone: "neutral" | "success" | "warning" = "neutral",
  ): ComponentNode => ({
    id: id(),
    type: "badge",
    text: value,
    style: {
      color: {
        background: "surface-muted",
        text: tone === "neutral" ? "text-muted" : tone,
      },
      spacing: { paddingX: "sm", paddingY: "xs" },
      border: { radius: "full" },
      typography: { size: "sm", weight: "medium" },
      sizing: { width: "fit" },
    },
  });
  const card = (
    children: ComponentNode[],
    style?: StyleSpec,
  ): ComponentNode => ({
    id: id(),
    type: "card",
    element: "article",
    style: {
      color: { background: "surface", text: "text" },
      spacing: { padding: "lg" },
      border: {
        radius: "lg",
        width: "hairline",
        color: "border",
        shadow: "sm",
      },
      sizing: { width: "full" },
      ...style,
    },
    children: [stack(children)],
  });
  const grid = (
    children: ComponentNode[],
    columns: 2 | 3 | 4 = 2,
  ): ComponentNode => ({
    id: id(),
    type: "grid",
    columns: 12,
    style: { spacing: { gap: "lg" }, sizing: { width: "full" } },
    children: children.map((child) => ({
      ...child,
      layout: { span: { mobile: 12, tablet: 6, desktop: 12 / columns } },
    })),
  });
  const field = (label: string, value: string): ComponentNode =>
    stack([text(label), text(value, false)], "sm");
  const divider = (): ComponentNode => ({ id: id(), type: "divider" });
  const inline = (
    children: ComponentNode[],
    gap: "xs" | "sm" | "md" = "sm",
  ): ComponentNode => ({
    id: id(),
    type: "flex",
    direction: "row",
    alignment: "center",
    distribution: "start",
    wrap: true,
    gap,
    children,
  });
  return {
    id,
    text,
    heading,
    stack,
    row,
    inline,
    button,
    badge,
    card,
    grid,
    field,
    divider,
  };
}
type Kit = ReturnType<typeof kit>;
function template(
  slug: string,
  name: string,
  title: string,
  description: string,
  category: AdminTemplate["category"],
  build: (nodes: Kit) => ComponentNode[],
): AdminTemplate {
  const id = `admin-${slug}`,
    nodes = kit(id);
  const document: ComponentDocument = {
    version: 2,
    id,
    name,
    kind: "section",
    root: {
      id: `${id}-root`,
      type: "section",
      style: {
        color: { background: "surface-sunken", text: "text" },
        typography: { family: "system" },
        spacing: { padding: "lg", gap: "lg" },
        sizing: { width: "full" },
      },
      responsive: { spacing: { mobile: { spacing: { padding: "md" } } } },
      children: [
        nodes.stack(
          [nodes.heading(title, true), nodes.text(description)],
          "sm",
        ),
        ...build(nodes),
      ],
    },
  };
  return {
    id,
    name,
    heading: title,
    description,
    category,
    value: { document, theme: structuredClone(theme) },
  };
}

/** Visual-only starters: example content, no live source, form submission or configured action. */
export const ADMIN_TEMPLATES: readonly AdminTemplate[] = [
  template(
    "dashboard-kpis",
    "Dashboard KPI cards",
    "Overview",
    "A snapshot of your workspace. Example figures for this month.",
    "Dashboard",
    (n) => [
      n.grid(
        [
          [
            "Revenue",
            "$24,860",
            "+12.8% this month",
            [8, 10, 9, 14, 12, 18, 22],
          ],
          ["Orders", "1,284", "+8.2% this month", [6, 9, 7, 12, 14, 13, 18]],
          ["Customers", "892", "+24 new customers", [4, 6, 6, 9, 12, 11, 16]],
          [
            "Completion rate",
            "94.2%",
            "+2.1% this month",
            [60, 64, 72, 70, 82, 86, 94],
          ],
        ].map(([label, value, trend, points]) =>
          n.card([
            {
              id: n.id(),
              type: "stat",
              label: label as string,
              value: value as string,
            },
            n.badge(trend as string, "success"),
            {
              id: n.id(),
              type: "sparkline",
              points: points as number[],
              ariaLabel: `${label} example trend`,
              showArea: true,
              accentColor: { kind: "token", value: "primary" },
            },
          ]),
        ),
        4,
      ),
    ],
  ),
  template(
    "record-grid",
    "Record card grid",
    "Products",
    "A flexible card layout for products, projects or inventory.",
    "Records",
    (n) => [
      n.row([n.text("3 example records"), n.button("Add record")]),
      n.grid(
        [
          ["Everyday notebook", "Stationery", "$18.00", "In stock"],
          ["Desk organizer", "Workspace", "$32.00", "In stock"],
          ["Travel bottle", "Accessories", "$24.00", "Low stock"],
        ].map(([name, category, price, status]) =>
          n.card([
            {
              id: n.id(),
              type: "image",
              src: "/visual-builder/placeholder.svg",
              alt: `${name} placeholder`,
              aspectRatio: "landscape",
              objectFit: "cover",
              style: {
                sizing: { width: "full", height: "10rem", fit: "cover" },
                border: { radius: "md" },
              },
            },
            n.row([
              n.text(category),
              n.badge(status, status === "Low stock" ? "warning" : "success"),
            ]),
            n.heading(name),
            n.text(price, false),
            n.row([n.button("View details", true), n.button("Edit")]),
          ]),
        ),
        3,
      ),
    ],
  ),
  template(
    "record-list",
    "Compact record list",
    "Directory",
    "A compact list for customers, team members or other records.",
    "Records",
    (n) => [
      n.row([
        n.text("Recently added · 3 example records"),
        n.button("Add record"),
      ]),
      n.stack(
        [
          ["Alex Morgan", "alex@example.test", "Active"],
          ["Jamie Chen", "jamie@example.test", "Active"],
          ["Taylor Wilson", "taylor@example.test", "Pending"],
        ].map(([name, email, status]) =>
          n.card([
            {
              id: n.id(),
              type: "grid",
              columns: 12,
              style: { spacing: { gap: "md" }, sizing: { width: "full" } },
              children: [
                {
                  ...n.stack([n.heading(name), n.text(email)], "sm"),
                  layout: { span: { mobile: 12, tablet: 6, desktop: 6 } },
                },
                {
                  ...n.stack([
                    n.badge(
                      status,
                      status === "Active" ? "success" : "warning",
                    ),
                  ]),
                  layout: { span: { mobile: 12, tablet: 6, desktop: 3 } },
                },
                {
                  ...n.row([n.button("View", true), n.button("Edit")]),
                  layout: { span: { mobile: 12, tablet: 12, desktop: 3 } },
                },
              ],
            },
          ]),
        ),
        "sm",
      ),
    ],
  ),
  template(
    "customer-profile",
    "Customer profile",
    "Customer profile",
    "An editable profile with contact information and account status.",
    "Profiles",
    (n) => [
      n.card([
        n.row([
          {
            id: n.id(),
            type: "avatar",
            src: "/visual-builder/placeholder.svg",
            alt: "Alex Morgan",
            fallback: "AM",
            style: {
              sizing: { height: "64px" },
              custom: { width: "64px" },
              border: { radius: "full" },
              color: { background: "primary-soft", text: "primary" },
            },
          },
          n.badge("Active customer", "success"),
        ]),
        n.heading("Alex Morgan"),
        n.text("Operations lead · Northstar Studio"),
        n.divider(),
        n.grid([
          n.field("Email", "alex@example.test"),
          n.field("Phone", "+1 555 010 2040"),
          n.field("Location", "Chicago, IL"),
          n.field("Customer since", "March 2026"),
        ]),
        n.divider(),
        n.row([n.button("View records", true), n.button("Edit profile")]),
      ]),
    ],
  ),
  template(
    "record-details",
    "Record details",
    "Record details",
    "A two-column detail panel for a project, asset or request.",
    "Details",
    (n) => [
      n.card([
        n.row([
          n.heading("Website redesign"),
          n.badge("In progress", "warning"),
        ]),
        n.text(
          "Refresh the customer portal and simplify the account experience.",
        ),
        n.divider(),
        n.grid([
          n.field("Reference", "PRJ-1042"),
          n.field("Owner", "Jamie Chen"),
          n.field("Department", "Product design"),
          n.field("Priority", "High"),
          n.field("Created", "November 1, 2026"),
          n.field("Due date", "November 30, 2026"),
        ]),
        n.divider(),
        n.row([n.button("Back to records", true), n.button("Edit record")]),
      ]),
    ],
  ),
  template(
    "order-summary",
    "Order summary",
    "Order #1042",
    "A reusable order or invoice summary with example line items.",
    "Commerce",
    (n) => [
      n.card([
        n.row([
          n.stack(
            [n.heading("Northstar Studio"), n.text("Placed November 4, 2026")],
            "sm",
          ),
          n.badge("Paid", "success"),
        ]),
        n.grid([
          n.field("Customer", "Alex Morgan"),
          n.field("Delivery address", "120 Lake Street, Chicago, IL"),
        ]),
        n.divider(),
        {
          id: n.id(),
          type: "table",
          headers: ["Item", "Qty", "Amount"],
          rows: [
            ["Everyday notebook", "2", "$36.00"],
            ["Desk organizer", "1", "$32.00"],
          ],
          caption: "Example order items",
        },
        n.row([n.text("Subtotal"), n.text("$68.00", false)]),
        n.row([n.text("Shipping"), n.text("$5.00", false)]),
        n.divider(),
        n.row([n.heading("Total"), n.heading("$73.00")]),
        n.row([n.button("View invoice", true), n.button("Manage order")]),
      ]),
    ],
  ),
  template(
    "activity-feed",
    "Activity feed",
    "Recent activity",
    "A timeline for audit events, project updates or customer activity.",
    "Activity",
    (n) => [
      n.card([
        n.row([n.heading("Workspace updates"), n.badge("Today")]),
        {
          id: n.id(),
          type: "timeline",
          entries: [
            {
              title: "10:42 AM · Order completed",
              description:
                "Alex Morgan completed order #1042. Payment received.",
            },
            {
              title: "10:18 AM · Customer added",
              description:
                "Jamie Chen added Northstar Studio to the customer directory.",
            },
            {
              title: "9:35 AM · Record updated",
              description:
                "Taylor Wilson updated the delivery details for order #1041.",
            },
          ],
        },
        n.divider(),
        n.row([
          n.text("Showing example activity"),
          n.button("View all activity", true),
        ]),
      ]),
    ],
  ),
  template(
    "empty-state",
    "Empty state",
    "No records yet",
    "A welcoming starting point for an empty list or new workspace.",
    "Empty states",
    (n) => [
      n.card(
        [
          {
            id: n.id(),
            type: "icon",
            iconId: "briefcase",
            size: 40,
            decorative: true,
            style: {
              color: { text: "primary", background: "primary-soft" },
              spacing: { padding: "md" },
              border: { radius: "lg" },
            },
          },
          n.heading("Your workspace starts here"),
          n.text(
            "Add your first record to start organizing your work. You can update its details at any time.",
          ),
          n.row([n.button("Add first record"), n.button("Learn more", true)]),
        ],
        {
          sizing: { width: "full", maxWidth: "3xl", align: "center" },
          spacing: { padding: "xl" },
          color: { background: "surface", text: "text" },
          border: { radius: "lg", width: "hairline", color: "border" },
        },
      ),
    ],
  ),
  template(
    "breadcrumbs-header",
    "Breadcrumbs and page header",
    "Inventory details",
    "A breadcrumb trail with current page status, title and primary actions.",
    "Navigation",
    (n) => [
      n.card([
        n.row([
          n.inline(
            [
              {
                id: n.id(),
                type: "icon",
                iconId: "home",
                size: 16,
                decorative: true,
                style: { color: { text: "primary" } },
              },
              n.text("Workspace"),
              n.text("/"),
              n.text("Catalog"),
              n.text("/"),
              n.badge("Inventory details", "neutral"),
            ],
            "xs",
          ),
          n.badge("Published", "success"),
        ]),
        n.divider(),
        n.row([
          n.stack(
            [
              n.heading("Q4 warehouse stock and fulfillment"),
              n.text(
                "Track active SKUs, warehouse allocations and pending replenishment tasks.",
              ),
            ],
            "sm",
          ),
          n.inline([n.button("Export CSV", true), n.button("Create entry")]),
        ]),
      ]),
    ],
  ),
  template(
    "quick-actions-hub",
    "Quick actions and shortcuts",
    "Quick actions",
    "Action cards with keyboard shortcuts for common dashboard workflows.",
    "Navigation",
    (n) => [
      n.grid(
        [
          [
            "New record",
            "Create a product, customer or order entry.",
            "sparkles",
            ["⌘", "N"],
            "Open form",
          ],
          [
            "Import data",
            "Upload CSV or spreadsheet records in bulk.",
            "arrow-right",
            ["⌘", "I"],
            "Choose file",
          ],
          [
            "Team directory",
            "Manage roles, permissions and workspace members.",
            "user-group",
            ["⌘", "M"],
            "View team",
          ],
          [
            "Audit and compliance",
            "Review recent changes and security checkpoints.",
            "shield-check",
            ["⌘", "L"],
            "Open logs",
          ],
        ].map(([title, desc, iconId, keys, actionLabel]) =>
          n.card([
            n.row([
              {
                id: n.id(),
                type: "icon",
                iconId: iconId as
                  | "sparkles"
                  | "arrow-right"
                  | "user-group"
                  | "shield-check",
                size: 24,
                decorative: true,
                style: {
                  color: { text: "primary", background: "primary-soft" },
                  spacing: { padding: "sm" },
                  border: { radius: "md" },
                },
              },
              { id: n.id(), type: "kbd", keys: keys as string[] },
            ]),
            n.heading(title as string),
            n.text(desc as string),
            n.button(actionLabel as string, true),
          ]),
        ),
        4,
      ),
    ],
  ),
  template(
    "analytics-breakdown",
    "Analytics and quota breakdown",
    "Performance and usage",
    "Bar chart comparison paired with resource quota progress bars.",
    "Dashboard",
    (n) => [
      n.grid(
        [
          n.card([
            n.row([
              n.heading("Monthly volume by channel"),
              n.badge("Last 5 periods", "neutral"),
            ]),
            n.text("Example distribution across active workspace channels."),
            {
              id: n.id(),
              type: "bar-chart",
              showValues: true,
              accentColor: { kind: "token", value: "primary" },
              bars: [
                { label: "Direct", value: 84 },
                { label: "Partners", value: 62 },
                { label: "Self-serve", value: 95 },
                { label: "Enterprise", value: 71 },
                { label: "Renewals", value: 88 },
              ],
            },
          ]),
          n.card([
            n.row([
              n.heading("Workspace quotas"),
              n.badge("Healthy", "success"),
            ]),
            n.text("Allocated capacity for the current billing cycle."),
            {
              id: n.id(),
              type: "progress",
              label: "Active records (7,400 / 10,000)",
              value: 74,
              showValue: true,
              accentColor: { kind: "token", value: "primary" },
            },
            {
              id: n.id(),
              type: "progress",
              label: "Automation runs (4,200 / 5,000)",
              value: 84,
              showValue: true,
              accentColor: { kind: "token", value: "warning" },
            },
            {
              id: n.id(),
              type: "progress",
              label: "File storage (18.5 GB / 50 GB)",
              value: 37,
              showValue: true,
              accentColor: { kind: "token", value: "success" },
            },
            n.divider(),
            n.row([
              n.text("Resets on December 1, 2026"),
              n.button("Manage plan", true),
            ]),
          ]),
        ],
        2,
      ),
    ],
  ),
  template(
    "workflow-stepper",
    "Workflow and onboarding stepper",
    "Setup and approval flow",
    "A multi-step progress tracker with checklist items and next actions.",
    "Workflows",
    (n) => [
      n.card([
        n.row([
          n.heading("Workspace launch checklist"),
          n.badge("Step 3 of 4", "warning"),
        ]),
        {
          id: n.id(),
          type: "steps",
          current: 2,
          items: [
            "Connect schema",
            "Configure access roles",
            "Verify sample records",
            "Publish to production",
          ],
        },
        n.divider(),
        n.grid(
          [
            n.stack([
              n.heading("Current stage: Verify sample records"),
              n.text(
                "Confirm field bindings and status rules before enabling live access for end users.",
              ),
              {
                id: n.id(),
                type: "list",
                marker: "check",
                items: [
                  "Primary schema fields mapped to card headings and badges",
                  "Conditional color thresholds reviewed for price and stock",
                  "Button actions linked to create and edit forms",
                ],
              },
            ]),
            n.stack([
              n.field("Assigned reviewer", "Alex Morgan"),
              n.field("Target launch", "November 15, 2026"),
              {
                id: n.id(),
                type: "tags",
                items: ["Production ready", "Q4 release", "Verified"],
              },
              n.row([
                n.button("Previous step", true),
                n.button("Mark step complete"),
              ]),
            ]),
          ],
          2,
        ),
      ]),
    ],
  ),
  template(
    "system-notices",
    "System alerts and status banners",
    "Operational notices",
    "Callout banners for maintenance windows, policy reminders and status alerts.",
    "Notices",
    (n) => [
      n.card([
        {
          id: n.id(),
          type: "alert",
          variant: "info",
          title: "Scheduled index maintenance",
          body: "Background reporting pipelines will pause briefly on Sunday at 02:00 UTC. Live record reads remain available.",
        },
        {
          id: n.id(),
          type: "alert",
          variant: "warning",
          title: "Action required: API credential rotation",
          body: "Two integration keys expire in 7 days. Rotate credentials in Project Integrations to avoid webhook interruptions.",
        },
        {
          id: n.id(),
          type: "alert",
          variant: "success",
          title: "All core services operational",
          body: "Dynamic schemas, workflow triggers and visual page rendering are operating at 99.98% uptime.",
        },
        n.divider(),
        n.row([
          {
            id: n.id(),
            type: "tags",
            items: ["Region: US-Central", "Build v2.4", "Audit enabled"],
          },
          n.inline([
            n.button("Notification settings", true),
            n.button("Acknowledge"),
          ]),
        ]),
      ]),
    ],
  ),
  template(
    "filter-status-bar",
    "Filter and active tags toolbar",
    "Active view controls",
    "A compact toolbar showing active filter tags, summary counts and view actions.",
    "Navigation",
    (n) => [
      n.card([
        n.row([
          n.inline([
            {
              id: n.id(),
              type: "icon",
              iconId: "scale",
              size: 18,
              decorative: true,
              style: { color: { text: "primary" } },
            },
            n.heading("Filtered view"),
            n.badge("24 matching records", "success"),
          ]),
          n.inline([
            n.button("Reset filters", true),
            n.button("Save view", true),
            n.button("New record"),
          ]),
        ]),
        n.divider(),
        n.row([
          n.inline([
            n.text("Active filters:"),
            {
              id: n.id(),
              type: "tags",
              items: [
                "Status: Active",
                "Region: North America",
                "Tier: Enterprise",
                "Updated: Last 30 days",
              ],
            },
          ]),
          n.text("Sorted by: Updated (newest first)"),
        ]),
      ]),
    ],
  ),
  template("inventory-count", "Inventory stock count", "Inventory count", "Track physical stock counts, expected quantities, discrepancies and bin capacity.", "Commerce", n => [
    n.grid([
      ["Total SKUs", "420", "All active items", "neutral"],
      ["Counted", "352", "84% completed", "success"],
      ["Low stock", "18", "Below reorder point", "warning"],
      ["Discrepancies", "4", "Needs recount", "warning"],
    ].map(([label, value, hint, tone]) => n.card([
      { id: n.id(), type: "stat", label, value },
      n.badge(hint, tone as "neutral" | "success" | "warning"),
    ])), 4),
    n.card([
      n.row([
        n.stack([
          n.heading("Cycle count #CC-204 · Main warehouse"),
          n.text("Compare expected system quantities against physical bin counts before posting adjustments."),
        ], "sm"),
        n.inline([n.button("Export count sheet", true), n.button("Record count")]),
      ]),
      { id: n.id(), type: "progress", label: "Zone A and Zone B bins counted (352 / 420)", value: 84, showValue: true, accentColor: { kind: "token", value: "primary" } },
      n.divider(),
      {
        id: n.id(),
        type: "table",
        headers: ["SKU", "Item", "Bin", "Expected", "Counted", "Variance", "Status"],
        rows: [
          ["SKU-1042", "Everyday notebook", "A-12", "120", "120", "0", "Matched"],
          ["SKU-1088", "Desk organizer", "A-14", "45", "42", "-3", "Variance"],
          ["SKU-1104", "Travel bottle", "B-03", "15", "8", "-7", "Low stock"],
          ["SKU-1190", "Brass pen set", "B-09", "60", "60", "0", "Matched"],
        ],
        caption: "Example inventory count lines",
      },
      n.divider(),
      n.row([
        { id: n.id(), type: "tags", items: ["Warehouse: North", "Cycle: Q4-Week 5", "Auditor: Jamie Chen"] },
        n.inline([n.button("Flag discrepancy", true), n.button("Approve adjustments")]),
      ]),
    ]),
  ]),
];
