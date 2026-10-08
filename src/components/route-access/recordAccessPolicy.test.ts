import { describe, expect, it } from "vitest";
import type { Field, RecordAccessPolicy } from "../../utils/api/container";
import {
  AUTH_CONTEXT_OPTIONS,
  authContextOptions,
  assignmentFieldOptions,
  isRecordAccessRoute,
  normalizeRecordAccessPolicy,
  parseAccessValue,
  routeAllowsAssignments,
  summarizeRecordAccessPolicy,
  validateRecordAccessPolicy,
} from "./recordAccessPolicy";

const fields: Field[] = [
  { name: "_id", type: "objectId" },
  { name: "id", type: "string" },
  { name: "ownerId", type: "objectId" },
  { name: "status", type: "string" },
  { name: "secret", type: "string", isHashed: true },
  { name: "calculated", type: "string", equation: "ownerId" },
];

describe("record access policy helpers", () => {
  it("recognizes record-backed and create assignment routes", () => {
    expect(isRecordAccessRoute("UpdateDynamicModelItem")).toBe(true);
    expect(isRecordAccessRoute("GetAllDynamicModelItems")).toBe(true);
    expect(isRecordAccessRoute("GetPipeline")).toBe(false);
    expect(routeAllowsAssignments("CreateDynamicModelItem")).toBe(true);
    expect(routeAllowsAssignments("CreateMultipleDynamicModelItem")).toBe(true);
    expect(routeAllowsAssignments("UpdateDynamicModelItem")).toBe(false);
  });

  it("excludes reserved, equation, and hashed assignment fields", () => {
    expect(assignmentFieldOptions(fields).map((field) => field.name)).toEqual([
      "ownerId",
      "status",
    ]);
  });

  it("offers only complete approved auth references", () => {
    expect(AUTH_CONTEXT_OPTIONS).toContain("{{auth.user.id}}");
    expect(AUTH_CONTEXT_OPTIONS).toContain("{{auth.user.roles}}");
    expect(AUTH_CONTEXT_OPTIONS).toContain("{{auth.identity.kind}}");
    expect(AUTH_CONTEXT_OPTIONS.every((value) => /^{{auth\.[^{}]+}}$/.test(value))).toBe(true);
    expect(
      authContextOptions([
        {
          name: "profile",
          type: "object",
          children: [
            { name: "departmentId", type: "objectId" },
            { name: "secret", type: "string", isHashed: true },
          ],
        },
      ]),
    ).toContain("{{auth.user.profile.departmentId}}");
    expect(authContextOptions([{ name: "password", type: "string", isHashed: true }])).not.toContain(
      "{{auth.user.password}}",
    );
  });

  it("parses literals, arrays, and auth references", () => {
    expect(parseAccessValue("42")).toBe(42);
    expect(parseAccessValue("true")).toBe(true);
    expect(parseAccessValue('["admin","manager"]')).toEqual(["admin", "manager"]);
    expect(parseAccessValue("{{auth.user.id}}")).toBe("{{auth.user.id}}");
    expect(parseAccessValue("private")).toBe("private");
  });

  it("validates operators, arrays, and non-empty policies", () => {
    expect(validateRecordAccessPolicy(undefined, fields, true)).not.toHaveLength(0);
    expect(
      validateRecordAccessPolicy(
        { any: [{ field: "status", operator: "in", value: "open" }] },
        fields,
        false,
      ),
    ).toContain("Rule 1: in requires a JSON array or array auth value");
    expect(
      validateRecordAccessPolicy(
        { any: [{ context: "{{auth.user.role}}", operator: "eq", value: "admin" }] },
        fields,
        false,
      ),
    ).toEqual([]);
  });

  it("summarizes assignments and OR rules", () => {
    const policy: RecordAccessPolicy = {
      assign: { ownerId: "{{auth.user.id}}" },
      any: [
        { field: "ownerId", operator: "eq", value: "{{auth.user.id}}" },
        { context: "{{auth.user.role}}", operator: "eq", value: "admin" },
      ],
    };
    expect(summarizeRecordAccessPolicy(policy)).toBe(
      "Set ownerId = current user ID · Allow ownerId equals current user ID OR user role equals admin",
    );
    expect(summarizeRecordAccessPolicy(undefined)).toBe("No policy");
  });

  it("removes empty policies instead of returning an empty object", () => {
    expect(normalizeRecordAccessPolicy({})).toBeUndefined();
    expect(normalizeRecordAccessPolicy({ assign: {}, any: [] })).toBeUndefined();
  });
});
