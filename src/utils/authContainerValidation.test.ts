import { describe, expect, it } from "vitest";
import {
  buildAuthUserPayload,
  canEnableGoogleLogin,
  getAuthUserFormFields,
  getAuthUserRoleField,
  getPrimaryAuthUserField,
} from "./authContainerValidation";

describe("canEnableGoogleLogin", () => {
  it("allows enabling google login when an email field exists", () => {
    expect(
      canEnableGoogleLogin([
        { name: "username", type: "string" },
        { name: "email", type: "string" },
      ]),
    ).toBe(true);
  });

  it("blocks enabling google login when no email field exists", () => {
    expect(
      canEnableGoogleLogin([
        { name: "username", type: "string" },
        { name: "password", type: "string" },
      ]),
    ).toBe(false);
  });

  it("does not require email login credential metadata", () => {
    expect(
      canEnableGoogleLogin([{ name: " EMAIL ", type: "string" }]),
    ).toBe(true);
  });
});

describe("getPrimaryAuthUserField", () => {
  it("uses the configured non-hashed login credential field", () => {
    expect(
      getPrimaryAuthUserField([
        { name: "email", type: "string" },
        { name: "username", type: "string", isLoginCredential: true },
      ])?.name,
    ).toBe("username");
  });

  it("falls back to username when login credential metadata is not configured", () => {
    expect(
      getPrimaryAuthUserField([
        { name: "username", type: "string" },
        { name: "role", type: "objectid" },
      ])?.name,
    ).toBe("username");
  });

  it("does not choose hashed password as the user identifier field", () => {
    expect(
      getPrimaryAuthUserField([
        { name: "password", type: "string", isLoginCredential: true, isHashed: true },
        { name: "username", type: "string" },
      ])?.name,
    ).toBe("username");
  });
});

describe("buildAuthUserPayload", () => {
  it("uses schema field names instead of hardcoded email", () => {
    expect(
      buildAuthUserPayload({
        values: {
          username: "osman",
          password: "secret",
        },
        roleFieldName: "role",
        role: "admin-role-id",
      }),
    ).toEqual({
      username: "osman",
      password: "secret",
      role: "admin-role-id",
    });
  });

  it("omits empty optional values", () => {
    expect(
      buildAuthUserPayload({
        values: {
          username: "osman",
          displayName: "",
        },
      }),
    ).toEqual({
      username: "osman",
    });
  });
});

describe("auth user form fields", () => {
  it("renders real auth schema fields and excludes the role select field", () => {
    expect(
      getAuthUserFormFields([
        { name: "username", type: "string" },
        { name: "password", type: "string", isHashed: true },
        { name: "role", type: "objectid", objectSchemaName: "role" },
      ]).map((field) => field.name),
    ).toEqual(["username", "password"]);
  });

  it("detects the role field from object schema metadata", () => {
    expect(
      getAuthUserRoleField([
        { name: "username", type: "string" },
        { name: "userRole", type: "objectid", objectSchemaName: "role" },
      ])?.name,
    ).toBe("userRole");
  });
});
