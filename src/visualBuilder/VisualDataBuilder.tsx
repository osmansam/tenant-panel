import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { VisualBuilder, type VisualBuilderProps } from "../visual-engine/editor/VisualBuilder";
import { VisualDataContext, type VisualDataField, type VisualDataSchema } from "../visual-engine/host/DataContext";
import { createManagementClient } from "./managementClient";
import VisualDataTools from "./VisualDataTools";
import VisualActionTools from "./VisualActionTools";
import type { ProjectScope } from "./types";
type RawField = { name?: string; Name?: string; type?: string; Type?: string; children?: RawField[]; Children?: RawField[] };
export function readVisualSchemas(input: unknown): VisualDataSchema[] {
 let value = input;
 for (let i = 0; i < 4 && value && typeof value === "object" && !Array.isArray(value) && "data" in value; i++) value = (value as { data: unknown }).data;
 if (!Array.isArray(value)) return [];
 const fields = (entries: RawField[], parents: string[] = []): VisualDataField[] => entries.flatMap(field => {
  const name = field?.name || field?.Name; if (typeof name !== "string" || !name) return [];
  const path = [...parents, name]; return [{ name, type: field.type || field.Type || "string", path }, ...fields(field.children || field.Children || [], path)];
 });
 return value.flatMap(entry => { const name = entry?.schemaName || entry?.SchemaName; return typeof name === "string" ? [{ name, fields: fields(entry.fields || entry.Fields || []) }] : []; });
}
export default function VisualDataBuilder({ scope, ...props }: VisualBuilderProps & { scope: ProjectScope }) {
 const client = useMemo(() => createManagementClient(scope), [scope.tenant, scope.project]);
 const metadata = useQuery({ networkMode: "always", queryKey: ["visual-schema-metadata", scope.tenant, scope.project], queryFn: async () => readVisualSchemas((await client.get("/container")).data), retry: false });
 const schemas = metadata.data || [];
 return <VisualDataContext.Provider value={schemas}><VisualBuilder {...props} renderDataTools={({ document, selectedId, onReplace, onSelect, theme }) => <div key={`${scope.tenant}/${scope.project}/${document.id}`} ><VisualDataTools document={document} selectedId={selectedId} onReplace={onReplace} onSelect={onSelect} schemas={schemas} theme={theme} /><VisualActionTools document={document} selectedId={selectedId} onReplace={onReplace} onSelect={onSelect} schemas={schemas} /></div>} /></VisualDataContext.Provider>;
}
