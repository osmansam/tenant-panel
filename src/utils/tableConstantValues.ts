export const mergeTableConstantValues = <T extends Record<string, unknown>>(
  editable: T,
  configured?: Record<string, unknown>,
  tableConstants?: Record<string, unknown>,
  callerConstants?: Record<string, unknown>,
): T => ({
  ...editable,
  ...(configured || {}),
  ...(tableConstants || {}),
  ...(callerConstants || {}),
});

export const omitTableConstantKeys = <T extends Record<string, unknown>>(
  updates: T,
  tableConstants?: Record<string, unknown>,
  callerConstants?: Record<string, unknown>,
): Partial<T> => {
  const protectedKeys = new Set([
    ...Object.keys(tableConstants || {}),
    ...Object.keys(callerConstants || {}),
  ]);
  return Object.fromEntries(
    Object.entries(updates).filter(([key]) => !protectedKeys.has(key)),
  ) as Partial<T>;
};
