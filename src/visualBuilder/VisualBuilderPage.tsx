import { useSearchParams } from "react-router-dom";
import LibraryVisualBuilderPage from "./LibraryVisualBuilderPage";
import PlacedVisualBuilderPage from "./PlacedVisualBuilderPage";
import type { ProjectScope } from "./types";
export default function VisualBuilderPage({ scope }: { scope: ProjectScope }) {
 const [params] = useSearchParams();
 const pageId = params.get("page"), componentId = params.get("component");
 return pageId && componentId ? <PlacedVisualBuilderPage key={`${scope.tenant}/${scope.project}/${pageId}/${componentId}`} scope={scope} pageId={pageId} componentId={componentId} /> : <LibraryVisualBuilderPage scope={scope} />;
}
