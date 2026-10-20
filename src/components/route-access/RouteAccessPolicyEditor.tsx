import { useEffect, useMemo, useState } from "react";
import type {
  Field,
  RecordAccessPolicy,
  RecordAccessRule,
} from "../../utils/api/container";
import { Button, Checkbox, Input, Select, WorkspaceDialog } from "../ui";
import {
  AUTH_CONTEXT_OPTIONS,
  RECORD_ACCESS_OPERATORS,
  assignmentFieldOptions,
  authContextOptions,
  formatAccessValue,
  normalizeRecordAccessPolicy,
  parseAccessValue,
  recordRuleFieldOptions,
  routeAllowsAssignments,
  summarizeRecordAccessPolicy,
  validateRecordAccessPolicy,
} from "./recordAccessPolicy";

interface RouteAccessPolicyEditorProps {
  open: boolean;
  routeName?: string;
  bulkRoutes?: {
    routeName: string;
    method?: string;
    access?: RecordAccessPolicy;
  }[];
  fields: Field[];
  authFields?: Field[];
  policy?: RecordAccessPolicy;
  onClose: () => void;
  onSave: (policy: RecordAccessPolicy | undefined, routeNames?: string[]) => void;
}

interface AssignmentDraft {
  field: string;
  value: string;
}

interface RuleDraft {
  source: "field" | "context";
  field: string;
  context: string;
  operator: string;
  value: string;
}

const policyDraft = (policy?: RecordAccessPolicy) => ({
  assignments: Object.entries(policy?.assign ?? {}).map(([field, value]) => ({
    field,
    value: formatAccessValue(value),
  })),
  rules: (policy?.any ?? []).map(
    (rule): RuleDraft => ({
      source: rule.context ? "context" : "field",
      field: rule.field ?? "",
      context: rule.context ?? "",
      operator: rule.operator || "eq",
      value: formatAccessValue(rule.value),
    }),
  ),
});

export function RouteAccessPolicyEditor({
  open,
  routeName = "",
  bulkRoutes,
  fields,
  authFields = [],
  policy,
  onClose,
  onSave,
}: RouteAccessPolicyEditorProps) {
  const initial = useMemo(() => {
    if (!bulkRoutes) return policyDraft(policy);

    const any = bulkRoutes[0]?.access?.any ?? [];
    const createRoutes = bulkRoutes.filter((route) =>
      routeAllowsAssignments(route.routeName),
    );
    const assign = createRoutes[0]?.access?.assign ?? {};
    return policyDraft({
      any: bulkRoutes.every(
        (route) => JSON.stringify(route.access?.any ?? []) === JSON.stringify(any),
      )
        ? any
        : [],
      assign: createRoutes.every(
        (route) => JSON.stringify(route.access?.assign ?? {}) === JSON.stringify(assign),
      )
        ? assign
        : {},
    });
  }, [policy, bulkRoutes]);
  const [selectedRouteNames, setSelectedRouteNames] = useState(
    () => bulkRoutes?.map((route) => route.routeName) ?? [],
  );
  const [assignments, setAssignments] = useState<AssignmentDraft[]>(
    initial.assignments,
  );
  const [rules, setRules] = useState<RuleDraft[]>(initial.rules);
  const [errors, setErrors] = useState<string[]>([]);
  const selectedRoutes = bulkRoutes?.filter((route) =>
    selectedRouteNames.includes(route.routeName),
  );
  const allowAssignments = selectedRoutes
    ? selectedRoutes.some((route) => routeAllowsAssignments(route.routeName))
    : routeAllowsAssignments(routeName);
  const requireAllowRules = selectedRoutes?.some(
    (route) => !routeAllowsAssignments(route.routeName),
  );
  const hasExistingPolicy = selectedRoutes
    ? selectedRoutes.some((route) => route.access)
    : !!policy;
  const noRoutesSelected = !!bulkRoutes && selectedRouteNames.length === 0;
  const assignmentFields = assignmentFieldOptions(fields);
  const ruleFields = recordRuleFieldOptions(fields);
  const contextOptions = useMemo(
    () => authContextOptions(authFields),
    [authFields],
  );

  useEffect(() => {
    if (!open) return;
    setAssignments(initial.assignments);
    setRules(initial.rules);
    setErrors([]);
  }, [initial, open]);

  useEffect(() => {
    if (!open) return;
    setSelectedRouteNames(bulkRoutes?.map((route) => route.routeName) ?? []);
  }, [bulkRoutes, open]);

  const buildPolicy = (): RecordAccessPolicy | undefined =>
    normalizeRecordAccessPolicy({
      ...(allowAssignments && assignments.length > 0
        ? {
            assign: Object.fromEntries(
              assignments.map((assignment) => [
                assignment.field,
                parseAccessValue(assignment.value),
              ]),
            ),
          }
        : {}),
      ...(rules.length > 0
        ? {
            any: rules.map(
              (rule): RecordAccessRule => ({
                ...(rule.source === "field"
                  ? { field: rule.field }
                  : { context: rule.context }),
                operator: rule.operator,
                value: parseAccessValue(rule.value),
              }),
            ),
          }
        : {}),
    });

  const submitPolicy = (nextPolicy: RecordAccessPolicy | undefined) => {
    if (noRoutesSelected) return;
    if (bulkRoutes) onSave(nextPolicy, selectedRouteNames);
    else onSave(nextPolicy);
  };

  const save = () => {
    const nextPolicy = buildPolicy();
    const nextErrors = validateRecordAccessPolicy(
      nextPolicy,
      fields,
      allowAssignments,
      contextOptions,
    );
    if (requireAllowRules && !nextPolicy?.any?.length) {
      nextErrors.push("Add at least one allow rule for non-create routes");
    }
    setErrors(nextErrors);
    if (nextErrors.length === 0) submitPolicy(nextPolicy);
  };

  const footer = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        {hasExistingPolicy && (
          <Button type="button" variant="destructive" onClick={() => submitPolicy(undefined)}>
            {bulkRoutes ? "Remove policies" : "Remove policy"}
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" onClick={save} disabled={noRoutesSelected}>
          {bulkRoutes
            ? `Apply to ${selectedRouteNames.length} ${selectedRouteNames.length === 1 ? "route" : "routes"}`
            : "Save policy"}
        </Button>
      </div>
    </div>
  );

  return (
    <WorkspaceDialog
      open={open}
      onClose={onClose}
      title={
        bulkRoutes
          ? "Bulk edit access policies"
          : `Access Policy: ${routeName.replace(/([A-Z])/g, " $1").trim()}`
      }
      description={
        bulkRoutes
          ? "Apply the same allow rules to all selected routes in this container."
          : "Trusted identity values are evaluated by the server and cannot be supplied by the request body."
      }
      footer={footer}
      className="max-w-4xl"
    >
      <datalist id="record-access-values">
        {contextOptions.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>

      <div className="space-y-6">
        {bulkRoutes && (
          <section className="space-y-3" aria-label="Routes to update">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold">Routes to update</h3>
              <span className="text-sm text-ui-muted">
                {selectedRouteNames.length} of {bulkRoutes.length} routes selected
              </span>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <Checkbox
                aria-label="Select all supported routes"
                checked={
                  bulkRoutes.length > 0 &&
                  selectedRouteNames.length === bulkRoutes.length
                }
                ref={(node) => {
                  if (node) {
                    node.indeterminate =
                      selectedRouteNames.length > 0 &&
                      selectedRouteNames.length < bulkRoutes.length;
                  }
                }}
                onChange={(event) => {
                  setSelectedRouteNames(
                    event.target.checked
                      ? bulkRoutes.map((route) => route.routeName)
                      : [],
                  );
                  setErrors([]);
                }}
              />
              Select all supported routes
            </label>
            <div className="max-h-56 overflow-y-auto rounded-ui-md border border-ui-border divide-y divide-ui-border">
              {bulkRoutes.map((route) => {
                const displayName = route.routeName.replace(/([A-Z])/g, " $1").trim();
                return (
                  <label
                    key={route.routeName}
                    className="flex cursor-pointer items-start gap-3 p-3 hover:bg-ui-surface-subtle"
                  >
                    <Checkbox
                      className="mt-0.5"
                      aria-label={`Apply policy to ${displayName}`}
                      checked={selectedRouteNames.includes(route.routeName)}
                      onChange={(event) => {
                        setSelectedRouteNames((current) =>
                          event.target.checked
                            ? [...current, route.routeName]
                            : current.filter((name) => name !== route.routeName),
                        );
                        setErrors([]);
                      }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{displayName}</span>
                      <span className="block text-xs text-ui-muted">{summarizeRecordAccessPolicy(route.access)}</span>
                    </span>
                    <span className="rounded bg-ui-surface-subtle px-2 py-1 text-xs font-medium">{route.method}</span>
                  </label>
                );
              })}
            </div>
            <p className="text-sm text-ui-muted">
              Applying this policy replaces existing policies on the selected routes and requires authentication.
              Trusted assignments apply only to selected create routes.
            </p>
          </section>
        )}
        {allowAssignments && (
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold">Trusted assignments</h3>
                <p className="text-sm text-ui-muted">
                  Values written by the server before a create operation.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setAssignments((current) => [
                    ...current,
                    { field: assignmentFields[0]?.name ?? "", value: "" },
                  ])
                }
                disabled={assignmentFields.length === 0}
              >
                Add assignment
              </Button>
            </div>
            {assignments.map((assignment, index) => (
              <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1.5fr_auto]">
                <Select
                  aria-label={`Assignment field ${index + 1}`}
                  className="ui-control"
                  value={assignment.field}
                  onChange={(event) =>
                    setAssignments((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, field: event.target.value }
                          : item,
                      ),
                    )
                  }
                >
                  <option value="">Select field</option>
                  {assignmentFields.map((field) => (
                    <option key={field.name} value={field.name}>
                      {field.name}
                    </option>
                  ))}
                </Select>
                <Input
                  aria-label={`Assignment value ${index + 1}`}
                  className="ui-control"
                  list="record-access-values"
                  value={assignment.value}
                  onChange={(event) =>
                    setAssignments((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, value: event.target.value }
                          : item,
                      ),
                    )
                  }
                  placeholder="Literal or {{auth.user.id}}"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    setAssignments((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                >
                  Remove assignment {index + 1}
                </Button>
              </div>
            ))}
          </section>
        )}

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold">Allow when any rule matches</h3>
              <p className="text-sm text-ui-muted">
                Rules are combined with OR. Record fields and trusted auth context are supported.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setRules((current) => [
                  ...current,
                  {
                    source: "field",
                    field: ruleFields[0]?.name ?? "",
                    context:
                      contextOptions.find(
                        (option) => option === "{{auth.user.role}}",
                      ) ?? AUTH_CONTEXT_OPTIONS[0],
                    operator: "eq",
                    value: "",
                  },
                ])
              }
            >
              Add allow rule
            </Button>
          </div>

          {rules.map((rule, index) => (
            <div key={index} className="rounded-ui-md border border-ui-border p-3">
              <div className="grid gap-2 md:grid-cols-4">
                <Select
                  aria-label={`Rule source ${index + 1}`}
                  className="ui-control"
                  value={rule.source}
                  onChange={(event) =>
                    setRules((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index
                          ? {
                              ...item,
                              source: event.target.value as "field" | "context",
                            }
                          : item,
                      ),
                    )
                  }
                >
                  <option value="field">Record field</option>
                  <option value="context">Auth context</option>
                </Select>
                {rule.source === "field" ? (
                  <Select
                    aria-label={`Rule field ${index + 1}`}
                    className="ui-control"
                    value={rule.field}
                    onChange={(event) =>
                      setRules((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, field: event.target.value }
                            : item,
                        ),
                      )
                    }
                  >
                    <option value="">Select field</option>
                    {ruleFields.map((field) => (
                      <option key={field.name} value={field.name}>
                        {field.name}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <Select
                    aria-label={`Rule context ${index + 1}`}
                    className="ui-control"
                    value={rule.context}
                    onChange={(event) =>
                      setRules((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, context: event.target.value }
                            : item,
                        ),
                      )
                    }
                  >
                    {contextOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                )}
                <Select
                  aria-label={`Rule operator ${index + 1}`}
                  className="ui-control"
                  value={rule.operator}
                  onChange={(event) =>
                    setRules((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, operator: event.target.value }
                          : item,
                      ),
                    )
                  }
                >
                  {RECORD_ACCESS_OPERATORS.map((operator) => (
                    <option key={operator} value={operator}>
                      {operator}
                    </option>
                  ))}
                </Select>
                <Input
                  aria-label={`Rule value ${index + 1}`}
                  className="ui-control"
                  list="record-access-values"
                  value={rule.value}
                  onChange={(event) =>
                    setRules((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, value: event.target.value }
                          : item,
                      ),
                    )
                  }
                  placeholder={
                    rule.operator === "in" || rule.operator === "nin"
                      ? '["admin", "manager"]'
                      : "Literal or approved auth value"
                  }
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                className="mt-2"
                onClick={() =>
                  setRules((current) =>
                    current.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
              >
                Remove rule {index + 1}
              </Button>
            </div>
          ))}
        </section>

        {errors.length > 0 && (
          <div role="alert" className="rounded-ui-md border border-ui-danger p-3 text-sm text-ui-danger">
            <ul className="list-disc space-y-1 pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </WorkspaceDialog>
  );
}
