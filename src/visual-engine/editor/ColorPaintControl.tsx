"use client";
import { useEffect, useState } from "react";
import { COLOR_TOKENS, type ColorToken } from "../model/styles";
import { isSafeCustomColor, type ColorValue } from "../model/paint";
import { colorCss } from "../renderer/paintStyles";
import { InspectorSelect } from "./InspectorSection";

export function ColorPaintControl({ label, value, resolvedTokenColors, allowTokens = true, onChange }: { label: string; value: ColorValue; resolvedTokenColors?: Partial<Record<ColorToken, string>>; allowTokens?: boolean; onChange(value: ColorValue): void }) {
  const resolved = value.kind === "token" ? resolvedTokenColors?.[value.value] ?? colorCss(value) : colorCss(value);
  const [draft, setDraft] = useState(resolved);
  useEffect(() => setDraft(resolved), [resolved]);
  const valid = isSafeCustomColor(draft);
  const picker = /^#[\da-f]{6}$/i.test(draft) ? draft : /^#[\da-f]{3}$/i.test(draft) ? `#${draft.slice(1).split("").map((character) => character.repeat(2)).join("")}` : "#000000";
  const change = (text: string) => { setDraft(text); if (isSafeCustomColor(text)) onChange({ kind: "custom", value: text.trim() }); };
  return <div className="vb-paint-color">
    <label className="vb-paint-color__label">{label}</label>
    <div className="vb-paint-color__inputs">
      <input type="color" aria-label={`${label} picker`} value={picker} onChange={(event) => change(event.target.value)} />
      <input className="vb-field__control" aria-label={label} value={draft} onChange={(event) => change(event.target.value)} placeholder="#RRGGBB, rgb(), hsl()" aria-invalid={!valid && draft !== resolved || undefined} />
    </div>
    {allowTokens ? <InspectorSelect label={`${label} preset`} value={value.kind === "token" ? value.value : "custom"} options={[{ value: "custom", label: "Custom color" }, ...COLOR_TOKENS.map((token) => ({ value: token, label: token.replace(/-/g, " ") }))]} onChange={(token) => {
      if (token === "custom") onChange({ kind: "custom", value: isSafeCustomColor(resolved) ? resolved : "#000000" });
      else onChange({ kind: "token", value: token as (typeof COLOR_TOKENS)[number] });
    }} /> : null}
    {!valid && draft !== resolved ? <small role="status">Enter a valid HEX, RGB, RGBA, HSL, or HSLA color.</small> : null}
  </div>;
}
