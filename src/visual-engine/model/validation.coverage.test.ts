import { describe, expect, it } from "vitest";
import { componentEditorRegistry } from "../components/editor";
import type { NodeType } from "./nodes";
import { parseComponentDocument, parseStyleSpec } from "./validation";
import { migrateComponentDocument } from "./migrations";

const document = (child?: unknown) => ({ version: 2, id: "doc", name: "Authored document", root: { id: "root", type: "section", children: child ? [child] : [] } });
function defaultNode(type: NodeType) {
  let sequence = 0;
  return componentEditorRegistry.get(type).createDefault(() => `${type}-${++sequence}`);
}

// Each assertion would fail if its field validator were removed, even if a different
// structural issue still rejected the document.
const invalidFields: Array<[NodeType, Record<string, unknown>, string]> = [
  ["heading", { level: 7 }, "heading.level_invalid"],
  ["text", { text: " " }, "text.content_required"],
  ["grid", { columns: 6 }, "grid.columns_required"],
  ["stack", { direction: "diagonal" }, "layout.direction_invalid"],
  ["flex", { alignment: "baseline", distribution: "invalid", gap: "bad", wrap: "true" }, "layout.alignment_invalid"],
  ["disclosure", { defaultOpen: "yes", transition: "flash" }, "disclosure.default_open_boolean_required"],
  ["accordion", { openMode: "none", collapsible: 1 }, "accordion.open_mode_invalid"],
  ["sidebar", { navigationWidth: 900 }, "sidebar.width_invalid"],
  ["infinite-slider", { autoPlay: "yes", speed: -1, slideWidth: 1, gap: 100, direction: "up" }, "slider.speed_invalid"],
  ["card", { element: "script" }, "card.element_invalid"],
  ["overlay", { alignment: "bad", inset: "bad", mobileFallback: "bad" }, "overlay.alignment_invalid"],
  ["form", { action: "javascript:alert(1)", method: "delete", successMessage: "" }, "form.method_invalid"],
  ["input", { fieldName: "__proto__", inputType: "password2", placeholder: "", required: "true" }, "field.name_invalid"],
  ["textarea", { rows: 1 }, "textarea.rows_invalid"],
  ["select", { options: [] }, "select.options_invalid"],
  ["select", { options: [null] }, "select.option_object_required"],
  ["select", { options: [{ value: "x", label: "One" }, { value: "x", label: "Two" }] }, "select.option_value_duplicate"],
  ["select", { options: [{ value: "x", label: "One", unsafe: true }] }, "select.option_key_unknown"],
  ["checkbox", { checkedByDefault: "true", value: "" }, "checkbox.checked_boolean"],
  ["image", { aspectRatio: "3:2", objectFit: "stretch" }, "image.aspect_ratio_invalid"],
  ["image-comparison", { position: 101, objectFit: "stretch", showLabels: "yes" }, "comparison.position_invalid"],
  ["button", { iconPosition: "top", submit: "yes", openInNewTab: "yes", accessibleLabel: " " }, "button.icon_position_invalid"],
  ["button", { action: { name: "" } }, "button.action_invalid"],
  ["button", { submit: true, href: "/next", openInNewTab: false }, "button.submit_href_invalid"],
  ["icon", { iconId: "missing", size: 2, decorative: false, accessibleLabel: undefined }, "icon.accessible_label_required"],
  ["badge", { text: "" }, "badge.text_required"],
  ["link", { href: "javascript:alert(1)", openInNewTab: "yes" }, "link.new_tab_boolean_required"],
  ["avatar", { fallback: "" }, "avatar.fallback_required"],
  ["list", { items: [""], marker: "invalid" }, "list.item_required"],
  ["list", { marker: "icon", iconId: undefined }, "list.icon_required"],
  ["stat", { prefix: "", suffix: "" }, "stat.prefix_invalid"],
  ["rating", { max: 20, value: 0.3, showValue: "yes" }, "rating.value_invalid"],
  ["quote", { avatarSrc: "/face.png", avatarAlt: undefined }, "quote.avatar_alt_required"],
  ["quote", { avatarSrc: undefined, avatarAlt: "Portrait" }, "quote.avatar_src_required"],
  ["video", { aspectRatio: "invalid", title: "" }, "aspect.ratio_invalid"],
  ["audio", { accessibleLabel: "" }, "audio.label_required"],
  ["embed", { loading: "instant" }, "embed.loading_invalid"],
  ["table", { headers: ["Name", "Value"], rows: [["one"]] }, "table.rows_width"],
  ["table", { rows: [[42]] }, "table.row_invalid"],
  ["progress", { value: Number.NaN, label: "" }, "progress.value_invalid"],
  ["steps", { current: -1 }, "steps.current_invalid"],
  ["timeline", { entries: [{ title: "", description: 2 }] }, "timeline.entry_invalid"],
  ["alert", { variant: "bad", body: "", title: "" }, "alert.variant_invalid"],
  ["tags", { items: [] }, "list.items_required"],
  ["kbd", { keys: [] }, "list.items_required"],
  ["bar-chart", { bars: [{ label: "A", value: -1 }] }, "chart.bar_invalid"],
  ["sparkline", { points: [1] }, "chart.points_required"],
  ["sparkline", { points: [1, Infinity] }, "chart.point_invalid"],
  ["theme-switcher", { labels: null }, "theme_switcher.labels_required"],
  ["repeater", { source: null }, "repeater.source_object_required"],
  ["repeater", { source: { kind: "other", schemaName: "bad schema", limit: 101, requestSlot: "!" } }, "repeater.limit_invalid"],
];

describe("portable document validation rejection paths", () => {
  it.each(invalidFields)("reports a specific issue for invalid %s properties", (type, patch, code) => {
    const parsed = parseComponentDocument(document({ ...defaultNode(type), ...patch }));
    expect(parsed.success).toBe(false);
    expect(parsed.issues.map(issue => issue.code)).toContain(code);
  });

  it.each([null, [], "document", 1])("rejects non-document input %j during migration", value => {
    expect(migrateComponentDocument(value)).toMatchObject({ success: false, issues: [{ code: "document.object_required" }] });
  });

  it("migrates an immutable version-one document and preserves source identity", () => {
    const input = { ...document(defaultNode("text")), version: 1, name: "  Title  ", source: { templateId: "template" } };
    const before = structuredClone(input);
    expect(migrateComponentDocument(input)).toMatchObject({ success: true, value: { version: 2, name: "Title", source: { templateId: "template" } } });
    expect(input).toEqual(before);
  });

  it("rejects duplicate IDs and unknown binding paths without losing issue locations", () => {
    const parsed = parseComponentDocument(document({ id: "root", type: "text", text: "Fallback", bindings: { text: { source: "item", path: ["constructor"] } } }));
    expect(parsed.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ code: "node.id_duplicate", path: "$.root.children[0].id" }),
      expect.objectContaining({ code: "binding.path_invalid", path: "$.root.children[0].bindings.text.path" }),
    ]));
  });

  it.each([
    [{ spacing: { gap: "unknown" } }, "style.token_invalid"],
    [{ custom: { width: "url(https://evil.test)" } }, "style.custom_length_invalid"],
  ])("rejects unsafe style input %j", (style, code) => {
    const parsed = parseStyleSpec(style);
    expect(parsed.success).toBe(false);
    expect(parsed.issues.map(issue => issue.code)).toContain(code);
  });
});
