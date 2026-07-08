import { Field } from "./api/container";

export const canEnableGoogleLogin = (fields: Field[] = []): boolean =>
  fields.some((field) => field.name.trim().toLowerCase() === "email");

const normaliseFieldName = (field: Field): string =>
  field.name.trim().toLowerCase();

const isUsableAuthIdentifierField = (field: Field): boolean => {
  const name = normaliseFieldName(field);
  return Boolean(field.name.trim()) && name !== "role" && !field.isHashed;
};

export const getPrimaryAuthUserField = (
  fields: Field[] = [],
): Field | undefined =>
  fields.find((field) => field.isLoginCredential && isUsableAuthIdentifierField(field)) ||
  fields.find((field) => normaliseFieldName(field) === "username") ||
  fields.find((field) => normaliseFieldName(field) === "email") ||
  fields.find(isUsableAuthIdentifierField);

export const getAuthUserRoleField = (fields: Field[] = []): Field | undefined =>
  fields.find((field) => {
    const name = normaliseFieldName(field);
    const objectSchemaName = field.objectSchemaName?.trim().toLowerCase();
    return name === "role" || objectSchemaName === "role";
  });

export const getAuthUserFormFields = (fields: Field[] = []): Field[] => {
  const roleFieldName = getAuthUserRoleField(fields)?.name;
  return fields.filter((field) => {
    const name = normaliseFieldName(field);
    return (
      Boolean(field.name.trim()) &&
      name !== "_id" &&
      name !== "id" &&
      field.name !== roleFieldName
    );
  });
};

export const buildAuthUserPayload = ({
  values,
  roleFieldName,
  role,
}: {
  values: Record<string, string>;
  roleFieldName?: string;
  role?: string;
}): Record<string, string> => {
  const payload: Record<string, string> = {};

  for (const [key, value] of Object.entries(values)) {
    if (value.trim()) {
      payload[key] = value.trim();
    }
  }

  if (roleFieldName && role?.trim()) {
    payload[roleFieldName] = role.trim();
  }

  return payload;
};
