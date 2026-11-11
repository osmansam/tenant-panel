/** Keep authored local content isolated across tenant/project scopes. */
export function scopedStorageKey(key: string, namespace = ""): string {
  return namespace ? `autotable:visual:${encodeURIComponent(namespace)}:${key}` : key;
}
