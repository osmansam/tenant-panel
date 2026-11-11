import { pageRequestComponents, pageRequestDefinitions, type PageRequestIssue } from "./pageRequests";
import type { PageRequestDefinition } from "../types/pageRequests";
export function validatePageRequestGraph(page: { sections?: unknown[]; requests?: PageRequestDefinition[]; subPage?: unknown }): PageRequestIssue[] {
  const edges = new Map<string, string[]>();
  const bind = (node: string, bindings: Record<string, unknown> | undefined) => {
    for (const binding of Object.values(bindings || {})) if (binding && typeof binding === "object" && "source" in binding && binding.source === "componentOutput" && "componentId" in binding) edges.set(node, [...edges.get(node) || [], `component:${binding.componentId}`]);
  };
  for (const request of pageRequestDefinitions(page)) for (const bag of ["params", "filters", "controls"] as const) bind(`request:${request.id}`, request.bindings?.[bag]);
  for (const component of pageRequestComponents(page)) {
    const node = `component:${component.id}`;
    bind(node, component.dataBinding?.parameters);
    for (const connection of Object.values(component.requestBindings || {})) edges.set(node, [...edges.get(node) || [], `request:${connection.requestId}`]);
  }
  const visiting = new Set<string>(), visited = new Set<string>();
  const visit = (node: string): boolean => {
    if (visiting.has(node)) return true;
    if (visited.has(node)) return false;
    visiting.add(node);
    if ((edges.get(node) || []).some(visit)) return true;
    visiting.delete(node); visited.add(node); return false;
  };
  return [...edges.keys()].some(visit) ? [{ code: "page_request_cycle", message: "A page request depends on a component that uses its own result. Remove the circular connection.", path: "requests" }] : [];
}
