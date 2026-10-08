import { useEffect, useMemo, useState } from "react";
import type {
  Field,
  RecordAccessPolicy,
  RecordAccessRule,
} from "../../utils/api/container";
import { Button } from "../ui/button";
import { WorkspaceDialog } from "../ui/workspace-dialog";
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
  validateRecordAccessPolicy,
} from "./recordAccessPolicy";

interface RouteAccessPolicyEditorProps {
  open: boolean;
  routeName: string;
  fields: Field[];
  authFields?: Field[];
  policy?: RecordAccessPolicy;
  onClose: () => void;
  onSave: (policy: RecordAccessPolicy | undefined) => void;
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
  routeName,
  fields,
  authFields = [],
  policy,
  onClose,
  onSave,
}: RouteAccessPolicyEditorProps) {
  const initial = useMemo(() => policyDraft(policy), [policy]);
  const [assignments, setAssignments] = useState<AssignmentDraft[]>(
    initial.assignments,
  );
  const [rules, setRules] = useState<RuleDraft[]>(initial.rules);
  const [errors, setErrors] = useState<string[]>([]);
  const allowAssignments = routeAllowsAssignments(routeName);
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

  const buildPolicy = (): RecordAccessPolicy | undefined =>
    normalizeRecordAccessPolicy({
      ...(assignments.length > 0
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

  const save = () => {
    const nextPolicy = buildPolicy();
    const nextErrors = validateRecordAccessPolicy(
      nextPolicy,
      fields,
      allowAssignments,
      contextOptions,
    );
    setErrors(nextErrors);
    if (nextErrors.length === 0) onSave(nextPolicy);
  };

  const footer = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        {policy && (
          <Button type="button" variant="destructive" onClick={() => onSave(undefined)}>
            Remove policy
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" onClick={save}>
          Save policy
        </Button>
      </div>
    </div>
  );

  return (
    <WorkspaceDialog
      open={open}
      onClose={onClose}
      title={`Access Policy: ${routeName.replace(/([A-Z])/g, " $1").trim()}`}
      description="Trusted identity values are evaluated by the server and cannot be supplied by the request body."
      footer={footer}
      className="max-w-4xl"
    >
      <datalist id="record-access-values">
        {contextOptions.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>

      <div className="space-y-6">
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
                <select
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
                </select>
                <input
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
                <select
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
                </select>
                {rule.source === "field" ? (
                  <select
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
                  </select>
                ) : (
                  <select
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
                  </select>
                )}
                <select
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
                </select>
                <input
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
