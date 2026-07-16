import { describe, expect, it } from "vitest";
import type {
  ComponentBlock,
  CreatePagePayload,
  PageModel,
  ParameterBinding,
  UpdatePagePayload,
} from "./api/page";
import {
  createRuntimeId,
  dependentBindings,
  ensurePageRuntimeIds,
  exposeTableFilter,
  formatBindingLabel,
  normalizePageRuntimeConfig,
  uniqueComponentStateKey,
  renameOutput,
  validatePageBindings,
} from "./pageBindings";

const table = (overrides: Partial<ComponentBlock> = {}): ComponentBlock =>
  ({
    id: "cmp_orders",
    stateKey: "orders",
    type: "table",
    table: {
      filterPanel: {
        inputs: [
          { id: "tfl_period", formKey: "period", type: "date" },
          {
            id: "tfl_regions",
            formKey: "regions",
            type: "select",
            isMultiple: true,
          },
        ],
      },
    },
    outputs: [
      {
        id: "out_period",
        key: "salesPeriod",
        type: "string",
        source: { kind: "tableFilter", filterId: "tfl_period" },
      },
    ],
    ...overrides,
  }) as ComponentBlock;

const pageWith = (...components: ComponentBlock[]): PageModel => ({
  name: "Bindings",
  sections: components.map((component) => ({
    type: "component",
    component,
  })),
});

describe("createRuntimeId", () => {
  it("creates unique prefixed ids without UUID hyphens", () => {
    for (const prefix of ["cmp", "tfl", "out", "var"] as const) {
      const ids = new Set(Array.from({ length: 20 }, () => createRuntimeId(prefix)));
      expect(ids.size).toBe(20);
      for (const id of ids) expect(id).toMatch(new RegExp(`^${prefix}_[0-9a-f]{32}$`));
    }
  });
});

describe("ensurePageRuntimeIds", () => {
  it("immutably traverses every supported component and filter location", () => {
    const missing = () =>
      ({
        type: "table",
        table: { filterPanel: { inputs: [{ formKey: "q", type: "string" }] } },
      }) as ComponentBlock;
    const existing = table();
    const page: PageModel = {
      name: "All",
      sections: [
        { component: missing() },
        {
          grid: { columns: 1, cells: [{ id: "g", row: 1, column: 1, components: [missing()] }] },
          cells: [{ id: "f", row: 1, column: 1, components: [missing()] }],
        },
        {
          tabs: {
            tabs: [
              { id: "p", label: "Page tab", order: 1, sections: [{ component: missing() }] },
            ],
          },
        },
        {
          component: {
            id: "cmp_tabs",
            type: "tabPanel",
            tabs: [{ title: "Component tab", components: [missing(), existing] }],
          },
        },
      ],
      subPage: pageWith(missing()),
    };

    const result = ensurePageRuntimeIds(page);
    expect(result).not.toBe(page);
    expect(existing.id).toBe("cmp_orders");
    expect(result.sections?.[3].component?.tabs?.[0].components[1]).toBe(existing);
    const serialized = JSON.stringify(result);
    expect((serialized.match(/"id":"cmp_/g) ?? []).length).toBe(8);
    expect((serialized.match(/"id":"tfl_/g) ?? []).length).toBe(8);
    expect(ensurePageRuntimeIds(result)).toBe(result);
    expect(page.sections?.[0].component?.id).toBeUndefined();
  });

  it("repairs legacy hyphenated component and table filter ids", () => {
    const page = pageWith(
      table({
        id: "comp-1782264143935",
        table: {
          filterPanel: {
            inputs: [{ id: "filter-1782264143935", formKey: "q", type: "string" }],
          },
        },
      }),
    );

    const result = ensurePageRuntimeIds(page);
    const component = result.sections?.[0].component;
    const filter = component?.table?.filterPanel?.inputs?.[0];

    expect(component?.id).toMatch(/^cmp_[0-9a-f]{32}$/);
    expect(filter?.id).toMatch(/^tfl_[0-9a-f]{32}$/);
    expect(validatePageBindings(result)).not.toContainEqual(
      expect.objectContaining({ code: "invalid_component_id" }),
    );
  });
});

describe("uniqueComponentStateKey", () => {
  it("creates safe unique state keys from titles without overwriting existing aliases", () => {
    const page = pageWith(
      table({ stateKey: "ordersTable" }),
      table({ id: "cmp_second", stateKey: "ordersTable2" }),
    );

    expect(uniqueComponentStateKey(page, "Orders Table", "table")).toBe("ordersTable3");
    expect(uniqueComponentStateKey(page, "", "infoBlocks")).toBe("infoBlocks");
    expect(uniqueComponentStateKey(page, "123 invalid name", "table")).toBe("table123InvalidName");
  });
});

describe("table filter outputs", () => {
  it("exposes an existing filter with its derived type without mutation", () => {
    const page = pageWith(table({ outputs: [] }));
    const exposed = exposeTableFilter(page, "cmp_orders", "tfl_regions", "regions");
    expect(exposed).not.toBe(page);
    expect(page.sections?.[0].component?.outputs).toEqual([]);
    expect(exposed.sections?.[0].component?.outputs?.[0]).toMatchObject({
      key: "regions",
      type: "stringArray",
      source: { kind: "tableFilter", filterId: "tfl_regions" },
    });
  });

  it("returns the original page for missing or incompatible references", () => {
    const page = pageWith(table());
    expect(exposeTableFilter(page, "missing", "tfl_period", "period")).toBe(page);
    expect(exposeTableFilter(page, "cmp_orders", "missing", "period")).toBe(page);
    const incompatible = pageWith(table({ type: "form" }));
    expect(exposeTableFilter(incompatible, "cmp_orders", "tfl_period", "period")).toBe(
      incompatible,
    );
  });
});

describe("labels and stable references", () => {
  it("renames aliases without rewriting id references", () => {
    const consumer = table({
      id: "cmp_consumer",
      dataBinding: {
        kind: "schema",
        parameters: {
          from: {
            source: "componentOutput",
            componentId: "cmp_orders",
            outputId: "out_period",
            field: "start",
          },
        },
      },
    });
    const page = pageWith(table(), consumer);
    const renamed = renameOutput(page, "cmp_orders", "out_period", "fiscalPeriod");
    const binding = renamed.sections?.[1].component?.dataBinding?.parameters?.from;
    expect(binding).toEqual(
      expect.objectContaining({ componentId: "cmp_orders", outputId: "out_period" }),
    );
    expect(formatBindingLabel(page, binding!)).toBe("orders.salesPeriod.start");
    expect(formatBindingLabel(renamed, binding!)).toBe("orders.fiscalPeriod.start");
  });

  it("gracefully formats missing references", () => {
    expect(
      formatBindingLabel(pageWith(table()), {
        source: "componentOutput",
        componentId: "cmp_missing",
        outputId: "out_missing",
      }),
    ).toContain("invalid");
  });
});

describe("validation and dependencies", () => {
  it("reports duplicate ids and aliases in deterministic order", () => {
    const page = pageWith(
      table(),
      table({
        table: {
          filterPanel: {
            inputs: [{ id: "tfl_period", formKey: "period", type: "date" }],
          },
        },
        outputs: [
          {
            id: "out_period",
            key: "salesPeriod",
            type: "string",
            source: { kind: "tableSearch" },
          },
        ],
      }),
    );
    page.variables = [
      { id: "var_region", key: "region", type: "string" },
      { id: "var_region", key: "region", type: "string" },
    ];
    expect(validatePageBindings(page).map((issue) => issue.code)).toEqual([
      "duplicate_variable_id",
      "duplicate_variable_key",
      "duplicate_component_id",
      "duplicate_state_key",
      "duplicate_filter_id",
    ]);
  });

  it("scopes output ids to one component", () => {
    const first = table();
    const second = table({
      id: "cmp_other",
      stateKey: "other",
      table: { filterPanel: { inputs: [] } },
      outputs: [
        {
          id: "out_period",
          key: "first",
          type: "string",
          source: { kind: "tableSearch" },
        },
        {
          id: "out_period",
          key: "second",
          type: "string",
          source: { kind: "tableSearch" },
        },
      ],
    });
    expect(validatePageBindings(pageWith(first, second)).map((item) => item.code)).toEqual([
      "duplicate_output_id",
    ]);
    expect(
      validatePageBindings(
        pageWith(first, { ...second, outputs: second.outputs?.slice(0, 1) }),
      ).map((item) => item.code),
    ).toEqual([]);
  });

  it("scopes variable ids and keys to each PageModel", () => {
    const page = pageWith();
    page.variables = [{ id: "var_region", key: "region", type: "string" }];
    page.subPage = {
      name: "Child",
      variables: [
        { id: "var_region", key: "region", type: "string" },
        { id: "var_region", key: "region", type: "string" },
      ],
    };
    expect(validatePageBindings(page).map((item) => item.code)).toEqual([
      "duplicate_variable_id",
      "duplicate_variable_key",
    ]);
    page.subPage.variables = page.subPage.variables!.slice(0, 1);
    expect(validatePageBindings(page)).toEqual([]);
    expect(formatBindingLabel(page, { source: "pageVariable", variableId: "var_region" })).toBe(
      "ambiguous variable (var_region)",
    );
  });

  it("persists variables in create and update payload contracts", () => {
    const variables = [{ id: "var_region", key: "region", type: "string" }] as const;
    const create: CreatePagePayload = { name: "Page", variables: [...variables] };
    const update: UpdatePagePayload = { variables: [...variables] };
    expect(create.variables).toEqual(update.variables);
  });

  it("persists page filters in create and update payload contracts", () => {
    const filters = [
      {
        id: "pfl_status",
        key: "status",
        label: "Status",
        type: "numberArray",
        defaultValue: [10, 23],
        defaultPreset: "today",
        arraySerialization: "comma",
        placement: { kind: "navbar" },
      },
    ] as const;
    const create: CreatePagePayload = { name: "Page", filters: [...filters] };
    const update: UpdatePagePayload = { filters: [...filters] };
    expect(create.filters).toEqual(update.filters);
  });

  it("persists main page selection in create and update payload contracts", () => {
    const create: CreatePagePayload = { name: "Page", isMainPage: true };
    const update: UpdatePagePayload = { isMainPage: true };
    expect(create.isMainPage).toBe(true);
    expect(update.isMainPage).toBe(create.isMainPage);
  });

  it("validates page filters and pageFilter bindings", () => {
    const page: PageModel = {
      name: "Orders",
      filters: [
        {
          id: "pfl_status",
          key: "status",
          label: "Status",
          type: "date",
          defaultPreset: "today",
          placement: { kind: "cell", cellId: "cell-main" },
        },
      ],
      sections: [
        {
          type: "grid",
          grid: {
            columns: 1,
            cells: [
              {
                id: "cell-main",
                row: 1,
                column: 1,
                components: [
                  {
                    id: "cmp_orders",
                    type: "table",
                    dataBinding: {
                      kind: "pipeline",
                      parameters: { status: { source: "pageFilter", filterId: "pfl_status" } },
                    },
                  } as ComponentBlock,
                ],
              },
            ],
          },
        },
      ],
    };

    expect(validatePageBindings(page)).toEqual([]);
    expect(formatBindingLabel(page, { source: "pageFilter", filterId: "pfl_status" })).toBe(
      "status",
    );
  });

  it("reports pageFilter bindings that point at missing filters", () => {
    const page = pageWith(
      table({
        dataBinding: {
          kind: "pipeline",
          parameters: { status: { source: "pageFilter", filterId: "pfl_missing" } },
        },
      }),
    );

    expect(validatePageBindings(page).map((issue) => issue.code)).toContain("missing_page_filter");
  });

  it("returns dependent bindings for page filters", () => {
    const page = pageWith(
      table({
        dataBinding: {
          kind: "pipeline",
          parameters: { status: { source: "pageFilter", filterId: "pfl_status" } },
        },
      }),
    );
    page.filters = [
      { id: "pfl_status", key: "status", label: "Status", type: "string", placement: { kind: "navbar" } },
    ];

    expect(dependentBindings(page, { kind: "pageFilter", filterId: "pfl_status" })).toHaveLength(1);
  });

  it("reports cell page filters that point at missing cells", () => {
    const page = pageWith(table());
    page.filters = [
      {
        id: "pfl_status",
        key: "status",
        label: "Status",
        type: "string",
        placement: { kind: "cell", cellId: "missing-cell" },
      },
    ];

    expect(validatePageBindings(page).map((issue) => issue.code)).toContain("missing_page_filter_cell");
  });

  it("preserves table nested rows before page requests", () => {
    const page = pageWith(
      table({
        table: {
          nestedRows: {
            enabled: true,
            field: "product",
            header: "Products",
            columns: [
              {
                field: "productDavinciId",
                displayName: "Davinci ID",
                type: "number",
              },
              { field: "productId", displayName: "Product ID" },
              { field: "quantity", displayName: "Quantity", type: "number" },
            ],
          },
          filterPanel: { inputs: [] },
        },
      }),
    );

    const normalized = normalizePageRuntimeConfig(page);

    expect(normalized.sections?.[0].component?.table?.nestedRows).toMatchObject(
      {
        enabled: true,
        field: "product",
        columns: [
          { field: "productDavinciId" },
          { field: "productId" },
          { field: "quantity" },
        ],
      },
    );
  });

  it("normalizes tenant panel page filters before page requests", () => {
    const page: PageModel = {
      name: "Reports",
      filters: [
        {
          id: "pfl_date",
          key: "date",
          label: "Date",
          type: "date",
          defaultPreset: "today",
          placement: { kind: "cell", cellId: "missing-cell" },
        },
        {
          id: "pfl_month",
          key: "month",
          label: "Month",
          type: "monthYear",
          defaultPreset: "today",
          placement: { kind: "cell", cellId: "cell-main" },
        },
      ],
      sections: [
        {
          columns: 1,
          cells: [{ id: "cell-main", row: 1, column: 1, components: [] }],
        },
      ],
    };

    const normalized = normalizePageRuntimeConfig(page);

    expect(normalized).not.toBe(page);
    expect(normalized.filters?.[0].placement).toEqual({ kind: "navbar" });
    expect(normalized.filters?.[1].defaultPreset).toBe("currentMonthYear");
    expect(validatePageBindings(normalized)).toEqual([]);
  });

  it("validates variable initial values without exposing their values", () => {
    const valid: NonNullable<PageModel["variables"]> = [
      { id: "var_string", key: "stringValue", type: "string", initialValue: "secret-valid" },
      { id: "var_number", key: "numberValue", type: "number", initialValue: 4.5 },
      { id: "var_boolean", key: "booleanValue", type: "boolean", initialValue: false },
      { id: "var_strings", key: "stringValues", type: "stringArray", initialValue: ["a"] },
      { id: "var_numbers", key: "numberValues", type: "numberArray", initialValue: [1, 2] },
      {
        id: "var_range",
        key: "dateValue",
        type: "dateRange",
        initialValue: {
          start: "2026-01-01T00:00:00Z",
          end: "2026-01-31",
          preset: null,
          timezone: "America/Chicago",
        },
      },
      { id: "var_null", key: "nullValue", type: "boolean", initialValue: null },
    ];
    expect(validatePageBindings({ name: "Valid", variables: valid })).toEqual([]);

    const invalid: NonNullable<PageModel["variables"]> = [
      { id: "var_string", key: "stringValue", type: "string", initialValue: 1 },
      { id: "var_number", key: "numberValue", type: "number", initialValue: Infinity },
      { id: "var_boolean", key: "booleanValue", type: "boolean", initialValue: "true" },
      { id: "var_strings", key: "stringValues", type: "stringArray", initialValue: ["a", 2] },
      { id: "var_numbers", key: "numberValues", type: "numberArray", initialValue: [1, NaN] },
      {
        id: "var_range",
        key: "dateValue",
        type: "dateRange",
        initialValue: { start: 1, unexpected: "secret-invalid" },
      },
    ];
    const issues = validatePageBindings({ name: "Invalid", variables: invalid });
    expect(issues.map((item) => item.code)).toEqual(
      Array.from({ length: 6 }, () => "invalid_variable_initial_value"),
    );
    expect(JSON.stringify(issues)).not.toContain("secret-invalid");
  });

  it("preserves legacy pages but requires ids once runtime config exists", () => {
    const legacy = pageWith({ type: "table" } as ComponentBlock);
    expect(validatePageBindings(legacy)).toEqual([]);
    const configured = pageWith({
      type: "table",
      outputs: [
        {
          id: "",
          key: "search",
          type: "string",
          source: { kind: "tableSearch" },
        },
      ],
    } as ComponentBlock);
    expect(validatePageBindings(configured).map((issue) => issue.code)).toEqual([
      "missing_component_id",
      "missing_output_id",
    ]);
  });

  it("rejects malformed and prototype-sensitive runtime ids", () => {
    const component = table({
      id: "cmp-orders",
      table: {
        filterPanel: {
          inputs: [{ id: "__proto__", formKey: "period", type: "date" }],
        },
      },
      outputs: [
        {
          id: "out-period",
          key: "period",
          type: "string",
          source: { kind: "tableFilter", filterId: "__proto__" },
        },
      ],
    });
    const page = pageWith(component);
    page.variables = [{ id: "var-region", key: "region", type: "string" }];
    expect(validatePageBindings(page).map((item) => item.code)).toEqual([
      "invalid_variable_id",
      "invalid_component_id",
      "invalid_filter_id",
      "invalid_output_id",
    ]);
  });

  it("validates output source type and binding field choices", () => {
    const invalid = table({
      outputs: [
        {
          id: "out_selected",
          key: "selected",
          type: "numberArray",
          source: { kind: "tableSelectedIds" },
        },
      ],
    });
    const consumer = table({
      id: "cmp_consumer",
      stateKey: "consumer",
      table: { filterPanel: { inputs: [] } },
      outputs: [],
      dataBinding: {
        kind: "schema",
        parameters: {
          badField: {
            source: "componentOutput",
            componentId: "cmp_orders",
            outputId: "out_selected",
            field: "start",
          },
          reserved: { source: "pageVariable", variableId: "var_nope" },
        },
      },
    });
    expect(validatePageBindings(pageWith(invalid, consumer)).map((issue) => issue.code)).toEqual([
      "output_type_mismatch",
      "invalid_binding_field",
      "unsupported_binding_source",
    ]);
  });

  it("reports missing component and output binding references", () => {
    const consumer = table({
      id: "cmp_consumer",
      stateKey: "consumer",
      table: { filterPanel: { inputs: [] } },
      outputs: [],
      dataBinding: {
        kind: "schema",
        parameters: {
          missingComponent: {
            source: "componentOutput",
            componentId: "cmp_missing",
            outputId: "out_period",
          },
          missingOutput: {
            source: "componentOutput",
            componentId: "cmp_orders",
            outputId: "out_missing",
          },
        },
      },
    });
    expect(validatePageBindings(pageWith(table(), consumer)).map((item) => item.code)).toContain(
      "missing_binding_component",
    );
    expect(validatePageBindings(pageWith(table(), consumer)).map((item) => item.code)).toContain(
      "missing_binding_output",
    );
  });

  it("rejects component output bindings that depend on the same component", () => {
    const selfBound = table({
      dataBinding: {
        kind: "schema",
        parameters: {
          after: {
            source: "componentOutput",
            componentId: "cmp_orders",
            outputId: "out_period",
          },
        },
      },
    });

    expect(validatePageBindings(pageWith(selfBound)).map((item) => item.code)).toContain(
      "self_binding_component_output",
    );
  });

  it("finds exact dependent locations and final-graph deletion can succeed", () => {
    const consumer = table({
      id: "cmp_consumer",
      stateKey: "consumer",
      dataBinding: {
        kind: "schema",
        parameters: {
          z: {
            source: "componentOutput",
            componentId: "cmp_orders",
            outputId: "out_period",
          },
        },
      },
    });
    const page = pageWith(table(), consumer);
    expect(dependentBindings(page, { kind: "output", componentId: "cmp_orders", outputId: "out_period" })).toEqual([
      expect.objectContaining({ componentId: "cmp_consumer", parameter: "z" }),
    ]);
    const finalPage = pageWith(
      table({ outputs: [] }),
      {
        ...consumer,
        type: "form",
        table: undefined,
        outputs: undefined,
        dataBinding: undefined,
      },
    );
    expect(validatePageBindings(finalPage)).toEqual([]);
  });

  it("handles prototype-sensitive parameter names and malformed cyclic bindings", () => {
    const parameters = Object.create(null) as Record<string, ParameterBinding>;
    parameters.__proto__ = { source: "static", value: "safe" };
    const cyclic = { source: "derived", transform: "previousEqualDuration" } as unknown as ParameterBinding & {
      input: ParameterBinding;
    };
    cyclic.input = cyclic;
    parameters["constructor"] = cyclic;
    const page = pageWith(table({ dataBinding: { kind: "schema", parameters } }));
    expect(() => validatePageBindings(page)).not.toThrow();
    expect(validatePageBindings(page).map((issue) => issue.parameter)).toContain("constructor");
  });

  it("accepts JSON-safe static object keys and reports malformed output sources", () => {
    const component = table({
      outputs: [
        {
          id: "out_bad",
          key: "bad",
          type: "string",
          source: undefined,
        } as unknown as NonNullable<ComponentBlock["outputs"]>[number],
      ],
      dataBinding: {
        kind: "schema",
        parameters: {
          payload: {
            source: "static",
            value: { "display name": "ok", constructor: "also data" },
          },
        },
      },
    });
    expect(() => validatePageBindings(pageWith(component))).not.toThrow();
    expect(validatePageBindings(pageWith(component)).map((item) => item.code)).toEqual([
      "unsupported_output_source",
    ]);
  });

  it("validates output type and source failures independently", () => {
    const unsafeOutput = (source: unknown, type: unknown = "string") =>
      ({
        id: "out_test",
        key: "test",
        type,
        source,
      }) as NonNullable<ComponentBlock["outputs"]>[number];

    expect(
      validatePageBindings(
        pageWith(table({ type: "form", outputs: [unsafeOutput({ kind: "unknown" })] })),
      ).map((item) => item.code),
    ).toEqual(["unsupported_output_source"]);
    expect(
      validatePageBindings(
        pageWith(table({ outputs: [unsafeOutput(undefined)] })),
      ).map((item) => item.code),
    ).toEqual(["unsupported_output_source"]);
    expect(
      validatePageBindings(
        pageWith(
          table({
            outputs: [
              unsafeOutput({ kind: "tableFilter", filterId: "tfl_missing" }, "bogus"),
            ],
          }),
        ),
      ).map((item) => item.code),
    ).toEqual(["invalid_output_type", "missing_output_filter"]);
    expect(
      validatePageBindings(
        pageWith(
          table({
            type: "form",
            outputs: [unsafeOutput({ kind: "tableSearch" })],
          }),
        ),
      ).map((item) => item.code),
    ).toEqual(["incompatible_output_source"]);
  });
});

describe("malformed page graphs", () => {
  const staticBinding: ParameterBinding = { source: "static", value: null };

  it("reports component-tab cycles and transformations fail clearly", () => {
    const component = {
      id: "cmp_cycle",
      type: "tabPanel",
      tabs: [{ title: "Cycle", components: [] }],
    } as ComponentBlock;
    component.tabs![0].components.push(component);
    const page = pageWith(component);

    expect(validatePageBindings(page).map((item) => item.code)).toEqual([
      "cyclic_page_reference",
    ]);
    expect(() => ensurePageRuntimeIds(page)).toThrow("Invalid page graph");
    expect(() => exposeTableFilter(page, "cmp_cycle", "tfl_x", "x")).toThrow(
      "Invalid page graph",
    );
    expect(() => renameOutput(page, "cmp_cycle", "out_x", "x")).toThrow(
      "Invalid page graph",
    );
    expect(dependentBindings(page, { kind: "component", componentId: "cmp_cycle" })).toEqual([]);
    expect(formatBindingLabel(page, staticBinding)).toBe("invalid page graph");
  });

  it("reports page-tab section and subPage cycles", () => {
    const section = {
      tabs: { tabs: [{ id: "tab", label: "Tab", order: 1, sections: [] }] },
    } as NonNullable<PageModel["sections"]>[number];
    section.tabs!.tabs[0].sections.push(section);
    expect(validatePageBindings({ name: "Section cycle", sections: [section] }).map(
      (item) => item.code,
    )).toEqual(["cyclic_page_reference"]);

    const page: PageModel = { name: "Page cycle" };
    page.subPage = page;
    expect(validatePageBindings(page).map((item) => item.code)).toEqual([
      "cyclic_page_reference",
    ]);
    expect(() => ensurePageRuntimeIds(page)).toThrow("Invalid page graph");
    expect(() => renameOutput(page, "cmp_x", "out_x", "x")).toThrow("Invalid page graph");
  });

  it("handles malformed collections consistently across public helpers", () => {
    const malformed = {
      name: "Malformed",
      sections: {},
    } as unknown as PageModel;
    expect(validatePageBindings(malformed).map((item) => item.code)).toEqual([
      "invalid_page_structure",
    ]);
    expect(dependentBindings(malformed, { kind: "component", componentId: "cmp_x" })).toEqual([]);
    expect(formatBindingLabel(malformed, staticBinding)).toBe("invalid page graph");
    expect(() => ensurePageRuntimeIds(malformed)).toThrow("Invalid page graph");
    expect(() => exposeTableFilter(malformed, "cmp_x", "tfl_x", "x")).toThrow(
      "Invalid page graph",
    );
    expect(() => renameOutput(malformed, "cmp_x", "out_x", "x")).toThrow(
      "Invalid page graph",
    );
  });

  it("reports malformed nested component collections without throwing raw errors", () => {
    const malformedPages = [
      pageWith(table({ outputs: {} as ComponentBlock["outputs"] })),
      pageWith(table({
        table: { filterPanel: { inputs: {} as never } },
      })),
      {
        name: "Malformed grid cell",
        sections: [
          { grid: { cells: [{ components: {} }] } },
        ],
      } as unknown as PageModel,
      pageWith({
        id: "cmp_tabs",
        type: "tabPanel",
        tabs: [{ title: "Bad", components: {} }],
      } as unknown as ComponentBlock),
      {
        name: "Malformed page tab",
        sections: [
          { tabs: { tabs: [{ id: "tab", label: "Tab", order: 1, sections: {} }] } },
        ],
      } as unknown as PageModel,
      { name: "Malformed variable", variables: [null] } as unknown as PageModel,
      pageWith(table({ outputs: [null] as unknown as ComponentBlock["outputs"] })),
      pageWith(table({
        table: { filterPanel: { inputs: [null] as never } },
      })),
      pageWith({
        id: "cmp_tabs",
        type: "tabPanel",
        tabs: [null],
      } as unknown as ComponentBlock),
      {
        name: "Malformed grid cell entry",
        sections: [
          { grid: { cells: [null] } },
        ],
      } as unknown as PageModel,
      {
        name: "Malformed flat cell entry",
        sections: [
          { cells: [null] },
        ],
      } as unknown as PageModel,
      {
        name: "Malformed page tab entry",
        sections: [
          { tabs: { tabs: [null] } },
        ],
      } as unknown as PageModel,
    ];

    for (const malformed of malformedPages) {
      expect(validatePageBindings(malformed).map((item) => item.code)).toEqual([
        "invalid_page_structure",
      ]);
    }

    expect(() => ensurePageRuntimeIds(malformedPages[8])).toThrow("Invalid page graph");
    expect(() => renameOutput(malformedPages[6], "cmp_orders", "out_x", "x")).toThrow(
      "Invalid page graph",
    );
  });

  it("formats cyclic derived bindings without overflowing the stack", () => {
    const binding = {
      source: "derived",
      transform: "previousCalendarPeriod",
    } as ParameterBinding;
    (binding as Extract<ParameterBinding, { source: "derived" }>).input = binding;

    expect(formatBindingLabel(pageWith(table()), binding)).toBe("invalid binding");
  });

  it("formats page-variable bindings with malformed variables without throwing", () => {
    const malformed = {
      name: "Malformed variable",
      variables: [null],
    } as unknown as PageModel;

    expect(formatBindingLabel(malformed, { source: "pageVariable", variableId: "var_x" })).toBe(
      "invalid page graph",
    );
  });
});
