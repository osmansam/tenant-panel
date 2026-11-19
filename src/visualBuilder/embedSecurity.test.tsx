import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { extendedContentRenderers } from "../visual-engine/components/renderers/native/extendedContent";
import type { EmbedNode } from "../visual-engine/model";
import type { SemanticRendererContext } from "../visual-engine/components/renderers/types";

function markup(src: string) {
  const node = { id: "embed", type: "embed", src, title: "External media", loading: "lazy" } as EmbedNode;
  const context = { className: "", combineNodeStyles: () => undefined } as unknown as SemanticRendererContext;
  return renderToStaticMarkup(<>{extendedContentRenderers.embed(node, context)}</>);
}
it("sandboxes media scripts without same-origin, navigation, forms or popups permissions", () => {
  const html = markup("https://www.youtube-nocookie.com/embed/example");
  expect(html).toContain('sandbox="allow-scripts"');
  expect(html).not.toContain("allow-same-origin");
  expect(html).toContain('referrerPolicy="no-referrer"');
});
it.each(["javascript:alert(1)", "data:text/html,hello", "//example.com", "/account", "file:///tmp/file", " https://example.com\n"])('rejects unsafe embed URL %s', (src) => {
  expect(markup(src)).not.toContain("<iframe");
});
it("preserves absolute HTTPS media URLs", () => {
  expect(markup("https://example.com/media?a=1")).toContain('src="https://example.com/media?a=1"');
});
