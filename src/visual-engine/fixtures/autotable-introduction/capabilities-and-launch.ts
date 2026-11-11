import { codeBlock, compactDesign } from "./builders";

export const AUTOTABLE_AUTOMATION_ENGINE = compactDesign(
  "autotable-introduction-automation-engine",
  "AutoTable · Automation and data engine",
  (b) => [
    b.grid(
      [
        b.intro(
          "AUTOMATION AND DATA ENGINE",
          "The behavior around your data is part of the product.",
          "Use project-aware building blocks to move from validated records to reliable application behavior.",
        ),
        b.text(
          "Each capability works from the same schema context, keeping queries, automation, permissions, and interfaces aligned.",
        ),
      ],
      [8, 4],
      [12, 12],
    ),
    b.grid(
      [
        b.panel([
          b.eyebrow("01 / DYNAMIC ROUTES"),
          b.heading("Operate on typed records.", "xl"),
          b.text("Create, filter, update, delete, export, and execute against the schemas enabled for a project."),
        ], true),
        b.panel([
          b.eyebrow("02 / WORKFLOWS"),
          b.heading("Coordinate business behavior.", "xl"),
          b.text("Validate a change, branch by record state, update related data, or hand work to an outbox phase."),
        ]),
        b.panel([
          b.eyebrow("03 / PIPELINES"),
          b.heading("Shape application-ready results.", "xl"),
          b.text("Filter, join, group, calculate, and project records for dashboards, reports, and downstream steps."),
        ]),
        b.panel([
          b.eyebrow("04 / SCHEDULED OPERATIONS"),
          b.heading("Run recurring work deliberately.", "xl"),
          b.text("Use cron-triggered workflows for cases such as reviewing overdue items or preparing a daily work batch."),
        ]),
        b.panel([
          b.eyebrow("05 / NOTIFICATIONS"),
          b.heading("Turn events into messages.", "xl"),
          b.text("Create notifications from workflow-controlled events without mixing delivery concerns into record validation."),
        ]),
        b.panel([
          b.eyebrow("06 / TENANT AND PROJECT ISOLATION"),
          b.heading("Keep every request in context.", "xl"),
          b.text("Resolve schemas, roles, workflows, and runtime data inside the active tenant and project boundary."),
        ]),
      ],
      [4, 4, 4, 4, 4, 4],
      [6, 6, 6, 6, 6, 6],
    ),
  ],
);

const ORDERS_REQUEST = `POST /api/v1/{tenantSlug}/{projectSlug}/dynamic?schemaName=orders HTTP/1.1
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "customerId": "cus_1042",
  "status": "paid",
  "total": 184.50,
  "currency": "USD"
}`;

export const AUTOTABLE_DEVELOPER_LAUNCH = compactDesign(
  "autotable-introduction-developer-launch",
  "AutoTable · Developer launch",
  (b) => [
    b.grid(
      [
        b.stack([
          b.eyebrow("START WITH A REAL REQUEST"),
          b.heading("Your schema is already an application boundary."),
          b.text(
            "Send an orders record through the project-scoped dynamic route. AutoTable applies the container's field rules, authentication, authorization, workflow lifecycle, and response handling around the request.",
          ),
          b.line(),
          b.text("Change the schema definition as the product evolves; the route stays connected to that model."),
          b.row([
            b.magneticButton("Start building", "#start-building"),
            b.button("Review the product flow", "#how-it-works", true),
          ]),
        ], { sizing: { maxWidth: "3xl" } }, "md"),
        b.stack([
          b.row([
            b.eyebrow("HTTP / CREATE ORDER"),
            b.text("PROJECT-SCOPED", { typography: { size: "sm", weight: "semibold" } }),
          ]),
          codeBlock("autotable-introduction-orders-request", ORDERS_REQUEST),
          b.text(
            "Typed validation and configured workflow behavior run inside the selected tenant and project.",
            { color: { text: "text-muted" } },
          ),
        ], {
          color: { background: "surface-sunken", text: "text" },
          border: { radius: "xl", width: "hairline", color: "text-subtle", shadow: "lg" },
          spacing: { padding: "md" },
        }, "sm"),
      ],
      [5, 7],
      [12, 12],
    ),
  ],
  true,
);
