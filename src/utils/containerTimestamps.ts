import { Field } from "./api/container";

export const SYSTEM_TIMESTAMP_FIELD_NAMES = ["createdAt", "updatedAt"] as const;

export const buildSystemTimestampField = (
  name: (typeof SYSTEM_TIMESTAMP_FIELD_NAMES)[number]
): Field => ({
  name,
  type: "date",
  tag: "",
  unique: false,
  isSearchable: true,
  isLoginCredential: false,
  isHashed: false,
  isForceDelete: false,
});

export const missingSystemTimestampFields = (fields: Field[] = []) => {
  const existingNames = new Set(fields.map((field) => field.name));
  return SYSTEM_TIMESTAMP_FIELD_NAMES.filter((name) => !existingNames.has(name));
};

export const hasAllSystemTimestampFields = (fields: Field[] = []) =>
  missingSystemTimestampFields(fields).length === 0;

export const addMissingSystemTimestampFields = (fields: Field[] = []) => [
  ...fields,
  ...missingSystemTimestampFields(fields).map(buildSystemTimestampField),
];
