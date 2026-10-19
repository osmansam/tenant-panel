/** Produces a readable ASCII identifier for tenant and project URLs. */
export function createUrlSlug(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase("en-US")
    .replace(/ı/g, "i")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
