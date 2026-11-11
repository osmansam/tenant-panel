# Conditional visual colors

The user approved the proposed ordered rule editor and chose text, background and
border coloring. Implement it in the existing Tenant Panel inspector and the
shared visual renderer used by react-template. Keep the current inline execution
preference and existing uncommitted work.

## Behavior

Select a styled component inside a repeater and open Conditional colors. Choose a
schema field or enter item.price (nested paths supported). Add/reorder/remove up
to 20 rules. Numeric comparisons are <, <=, >, >= and Between; Between includes
the lower bound and excludes the upper bound. Equals/not-equals support typed
text, numeric and boolean values. Numeric comparisons require actual finite
numbers; missing/null/non-numeric fields never match. Comparisons are strict and
use own properties only. There are no JavaScript expressions or evaluation.

The first matching rule supplies its selected text/background/border colors.
Other rules are not combined. Unspecified colors retain the normal style. If
nothing matches, the authored style is unchanged. Existing color controls provide
theme tokens and safe custom colors. Background overrides replace the selected
node's background paints with a solid color. Text overrides replace its text
paint; explicitly styled descendants retain their own styles. Border rules change
color only; a visible border width must already be authored.

The canvas without record context shows the default style. Sample records and
published records show per-item matching colors. No additional API requests or
changes to query/cache behavior. Never store evaluated styles or record values.

## Approach and compatibility

Use optional NodeBase.conditionalColors: an array of bounded validated rules
{id,path,operator,value,upper?,colors:{text?,background?,border?}}. This additive
field stays in the current v2 document format, clones/exports/saves with ordinary
nodes, and participates in normal undo/redo. Existing documents behave exactly as
before. Sync model/validation/resolution/renderer changes in both frontends.

The chosen approach is structured per-node rules using existing item context and
color controls. Inline scripting would complicate validation/editor behavior;
predefined color themes would not express the user's thresholds. Do not introduce
another condition language, data fetcher, CSS framework or document migration.
Runtime-owned containers which do not apply their own styles (slots/disclosures/
accordion/tabs/sidebar/scroll-story/scroll-scene/repeater) cannot hold rules; use a
styled Card, Stack, Flex or child component instead. The inspector only offers
rules in an item context on supported nodes.

## Verification

Real parser round-trip/reject tests, pure matching boundaries/types/paths, actual
renderer multi-record style/fallback/immutability tests in both frontends. Panel
inspector tests exercise authoring, color selection, priority, removal and history.
Verify layered paint precedence and ordinary styles with no match. Full suites,
standalone TypeScript, focused lint, temporary builds, isolated browser configure/
save/sample/runtime cases and a fresh focused final review. No real records or
unrelated work may be changed.
