"use client";

import { useState } from "react";
import { OZMISHOW_ICON_IDS, type OzmishowIconId } from "../model/icons";
import { getOzmishowIconComponent } from "../components/renderers/native/iconCatalog";
import { humanizeToken } from "./tokenLabels";

export interface IconPickerProps {
  label: string;
  value?: OzmishowIconId;
  onChange(value: OzmishowIconId): void;
  onClear?(): void;
}

export function IconPicker({ label, value, onChange, onClear }: IconPickerProps) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const icons = OZMISHOW_ICON_IDS.filter((id) => id.includes(normalized) || humanizeToken(id).toLowerCase().includes(normalized));

  return (
    <fieldset className="vb-field vb-field--stacked">
      <legend className="vb-field__label">{label}</legend>
      <input
        className="vb-field__control"
        type="search"
        aria-label={`Search ${label}`}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {value && onClear ? <button type="button" className="vb-button" aria-label={`Clear ${label}`} onClick={onClear}>No icon</button> : null}
      <div className="grid grid-cols-3 gap-1" role="list" aria-label={`${label} choices`}>
        {icons.map((id) => {
          const Icon = getOzmishowIconComponent(id);
          const labelText = humanizeToken(id);
          return (
            <button
              key={id}
              type="button"
              className="vb-button"
              aria-label={labelText}
              aria-pressed={value === id}
              onClick={() => onChange(id)}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              <span>{labelText}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
