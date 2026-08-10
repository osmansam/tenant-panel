import { describe, expect, it } from "vitest";
import {
  appendShowFiltersControl,
  createTableToggleState,
  isBooleanColumnEditable,
  isBooleanColumnSwitchPresentation,
  isTableColumnVisible,
  isTableToggleUpperSide,
  mergeTableToggleFilters,
  resolveToggleRequestEffects,
} from "./tableToggles";

const toggles = [
  {
    id: "showInactive",
    label: "Show inactive",
    defaultValue: false,
    request: {
      off: { type: "set" as const, field: "deleted", value: false },
      on: { type: "omit" as const },
    },
  },
];

describe("table toggles", () => {
  it("resolves placement and keeps Show Filters after display toggles", () => {
    const upper = { label: "Upper", isUpperSide: true };
    const lower = { label: "Lower", isUpperSide: false };
    const showFilters = { label: "Show Filters", isUpperSide: true };

    expect(isTableToggleUpperSide({ ...toggles[0], isUpperSide: false })).toBe(
      false,
    );
    expect(isTableToggleUpperSide(toggles[0])).toBe(true);
    expect(appendShowFiltersControl([upper, lower], showFilters)).toEqual([
      upper,
      lower,
      showFilters,
    ]);
  });

  it("creates local state from configured defaults", () => {
    expect(
      createTableToggleState([
        ...toggles,
        { id: "editMode", label: "Edit mode", defaultValue: true },
      ]),
    ).toEqual({ showInactive: false, editMode: true });
  });

  it("sets a request field while off and omits its own contribution while on", () => {
    expect(resolveToggleRequestEffects(toggles, { showInactive: false })).toEqual({
      deleted: false,
    });
    expect(resolveToggleRequestEffects(toggles, { showInactive: true })).toEqual(
      {},
    );
  });

  it("uses configured order when active effects set the same field", () => {
    const ordered = [
      {
        id: "first",
        label: "First",
        defaultValue: true,
        request: {
          on: { type: "set" as const, field: "status", value: "active" },
        },
      },
      {
        id: "second",
        label: "Second",
        defaultValue: true,
        request: {
          on: { type: "set" as const, field: "status", value: "archived" },
        },
      },
    ];

    expect(resolveToggleRequestEffects(ordered, { first: true, second: true })).toEqual({
      status: "archived",
    });
    expect(
      resolveToggleRequestEffects([...ordered].reverse(), {
        first: true,
        second: true,
      }),
    ).toEqual({ status: "active" });
  });

  it("merges filter panel, toggle effects, and constant filters in precedence order", () => {
    expect(
      mergeTableToggleFilters(
        { deleted: true, tenantId: "panel" },
        toggles,
        { showInactive: false },
        { tenantId: "constant" },
      ),
    ).toEqual({ deleted: false, tenantId: "constant" });

    expect(
      mergeTableToggleFilters(
        { deleted: true },
        toggles,
        { showInactive: true },
      ),
    ).toEqual({ deleted: true });
  });

  it("controls visibility and editability while missing references fail open", () => {
    const states = { showInactive: false };

    expect(
      isTableColumnVisible(
        { toggleId: "showInactive", when: true },
        states,
        toggles,
      ),
    ).toBe(false);
    expect(
      isBooleanColumnEditable(
        { toggleId: "showInactive", when: false },
        states,
        toggles,
      ),
    ).toBe(true);
    expect(
      isTableColumnVisible({ toggleId: "missing", when: true }, states, toggles),
    ).toBe(true);
    expect(
      isBooleanColumnEditable(
        { toggleId: "missing", when: true },
        states,
        toggles,
      ),
    ).toBe(true);
    expect(isBooleanColumnEditable(undefined, states, toggles)).toBe(true);
  });

  it("controls switch/check presentation while missing references fail open", () => {
    const states = { showInactive: false };

    expect(
      isBooleanColumnSwitchPresentation(
        { toggleId: "showInactive", when: false },
        states,
        toggles,
      ),
    ).toBe(true);
    expect(
      isBooleanColumnSwitchPresentation(
        { toggleId: "showInactive", when: true },
        states,
        toggles,
      ),
    ).toBe(false);
    expect(
      isBooleanColumnSwitchPresentation(
        { toggleId: "missing", when: true },
        states,
        toggles,
      ),
    ).toBe(true);
  });
});
