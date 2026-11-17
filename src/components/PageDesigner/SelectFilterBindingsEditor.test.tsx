// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import type { FormFieldConfig, GridSection, RelationMatrixConfig } from "../../types/page";
import type { SelectFilterBinding } from "../../types/selectFilters";
import { cleanRelationMatrixConfig } from "../../utils/relationMatrixConfig";
import { parseRequestFiltersInput } from "../../utils/requestFilterTemplates";
import FormFieldEditor from "./FormFieldEditor";
import { cleanFormConfig, cleanTableConfig, PageDesigner } from "./PageDesigner";
import RelationMatrixFilterEditor from "./RelationMatrixRowFilterEditor";
import SelectFilterBindingsEditor from "./SelectFilterBindingsEditor";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock("../../utils/api/container", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../utils/api/container")>()),
  useGetContainers: () => [
    {
      schemaName: "locations",
      schemaName: "products",
      fields: [
        { name: "name", type: "string" },
        { name: "code", type: "string" },
        { name: "item", type: "objectId" },
      ],
    },
    {
      schemaName: "count_lists",
      schemaName: "items",
      fields: [
        { name: "title", type: "string" },
        { name: "location", type: "objectId" },
        { name: "regionCode", type: "string" },
        { name: "archived", type: "boolean" },
        { name: "tier", type: "int" },
        { name: "name", type: "string" },
        { name: "code", type: "string" },
        { name: "active", type: "boolean" },
      ],
    },
  ],
}));
vi.mock("./CellExcelUploadModal", () => ({ CellExcelUploadModal: () => null }));

const containers = [
  {
    schemaName: "locations",
    schemaName: "products",
    fields: [
      { name: "name", type: "string" },
      { name: "code", type: "string" },
      { name: "item", type: "objectId" },
    ],
  },
  {
    schemaName: "count_lists",
    schemaName: "items",
    fields: [
      { name: "title", type: "string" },
      { name: "location", type: "objectId" },
      { name: "regionCode", type: "string" },
      { name: "archived", type: "boolean" },
      { name: "tier", type: "int" },
      { name: "name", type: "string" },
      { name: "code", type: "string" },
      { name: "active", type: "boolean" },
    ],
  },
];

describe("SelectFilterBindingsEditor and Tenant Panel serialization", () => {
  it("adds, edits, summarizes, and removes record, input, and typed literal rules", async () => {
    const user = userEvent.setup();
    let latest: SelectFilterBinding[] | undefined;

    const Harness = () => {
      const [bindings, setBindings] = useState<SelectFilterBinding[] | undefined>(undefined);
      const locationField: FormFieldConfig = {
        formKey: "location",
        label: "Location",
        type: "select",
        optionsSource: "schema",
        sourceSchemaName: "locations",
      };
      const tierField: FormFieldConfig = {
        formKey: "tierInput",
        label: "Tier Input",
        type: "number",
      };
      const countListField: FormFieldConfig = {
        formKey: "countList",
        label: "Count list",
        type: "select",
        optionsSource: "schema",
        sourceSchemaName: "count_lists",
        sourceFilterBindings: bindings,
      };
      return (
        <SelectFilterBindingsEditor
          field={countListField}
          fields={[locationField, tierField, countListField]}
          containers={containers}
          onChange={(next) => {
            latest = next;
            setBindings(next);
          }}
        />
      );
    };

    render(<Harness />);
    await user.click(screen.getByRole("button", { name: /add dependent filter/i }));
    expect(latest).toHaveLength(1);
    expect(latest?.[0]).toMatchObject({
      operator: "eq",
      value: { source: "record", fieldKey: "location", path: ["_id"] },
    });

    await user.clear(screen.getByRole("textbox", { name: "Rule 1 source field path" }));
    await user.type(screen.getByRole("textbox", { name: "Rule 1 source field path" }), "location");
    expect(screen.getByText("Count list.location equals Location → _id")).toBeInTheDocument();

    await user.clear(screen.getByRole("textbox", { name: "Rule 1 record field path" }));
    await user.type(screen.getByRole("textbox", { name: "Rule 1 record field path" }), "region.code");
    expect(latest?.[0]?.value).toEqual({
      source: "record",
      fieldKey: "location",
      path: ["region", "code"],
    });

    await user.selectOptions(screen.getByRole("combobox", { name: "Rule 1 value source" }), "field");
    await user.selectOptions(screen.getByRole("combobox", { name: "Rule 1 peer input" }), "tierInput");
    await user.selectOptions(screen.getByRole("combobox", { name: "Rule 1 comparison" }), "in");
    expect(latest?.[0]).toMatchObject({
      operator: "in",
      value: { source: "field", fieldKey: "tierInput" },
    });

    await user.selectOptions(screen.getByRole("combobox", { name: "Rule 1 value source" }), "literal");
    await user.selectOptions(screen.getByRole("combobox", { name: "Rule 1 comparison" }), "eq");
    await user.selectOptions(screen.getByRole("combobox", { name: "Rule 1 fixed value type" }), "boolean");
    await user.selectOptions(screen.getByRole("combobox", { name: "Rule 1 fixed value" }), "false");
    expect(latest?.[0]?.value).toEqual({ source: "literal", value: false });

    await user.click(screen.getByRole("button", { name: "Remove rule 1" }));
    expect(latest).toBeUndefined();
  });

  it("wires the shared editor into FormFieldEditor and RelationMatrixFilterEditor and preserves rules through serializers", async () => {
    const user = userEvent.setup();
describe("Request filters template syntax and Tenant Panel serialization", () => {
  it("parses {{product.item._id}}=item._id and JSON templates directly in Request filters without a separate dependent-filter editor", () => {
    const onFormFieldChange = vi.fn();
    const locationField: FormFieldConfig = {
      formKey: "location",
      label: "Location",
    const productField: FormFieldConfig = {
      formKey: "product",
      label: "Product",
      type: "select",
      optionsSource: "schema",
      sourceSchemaName: "locations",
      sourceSchemaName: "products",
    };
    const countListField: FormFieldConfig = {
      formKey: "countList",
      label: "Count list",
    const itemField: FormFieldConfig = {
      formKey: "item",
      label: "Item",
      type: "select",
      optionsSource: "schema",
      sourceSchemaName: "count_lists",
      sourceSchemaName: "items",
    };

    render(
      <FormFieldEditor
        field={countListField}
        field={itemField}
        index={1}
        containers={containers}
        formFields={[locationField, countListField]}
        formFields={[productField, itemField]}
        onChange={onFormFieldChange}
        onRemove={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /add dependent filter/i }));
    expect(onFormFieldChange).toHaveBeenCalledWith(
      expect.objectContaining({
        sourceFilterBindings: [
          expect.objectContaining({
            value: { source: "record", fieldKey: "location", path: ["_id"] },
          }),
        ],
      }),
    expect(screen.queryByRole("button", { name: /add dependent filter/i })).toBeNull();
    expect(screen.queryByText(/Dependent request filters/i)).toBeNull();

    const requestFiltersInput = screen.getByPlaceholderText(
      /\{\{product\.item\._id\}\}=item\._id/i,
    );
    fireEvent.change(requestFiltersInput, {
      target: { value: "{{product.item._id}}=item._id" },
    });
    expect(onFormFieldChange).toHaveBeenLastCalledWith({
      sourceRequestFilters: { _id: "{{product.item._id}}" },
    });

    const rule: SelectFilterBinding = {
      id: "rule_loc",
      field: "location",
      operator: "eq",
      value: { source: "record", fieldKey: "location", path: ["_id"] },
    fireEvent.change(requestFiltersInput, {
      target: { value: '{"_id":"{{product.item._id}}","active":true}' },
    });
    expect(onFormFieldChange).toHaveBeenLastCalledWith({
      sourceRequestFilters: { _id: "{{product.item._id}}", active: true },
    });
  });

  it("preserves template request filters through Form, Table, and RelationMatrix serializers", () => {
    const productField: FormFieldConfig = {
      formKey: "product",
      label: "Product",
      type: "select",
      optionsSource: "schema",
      sourceSchemaName: "products",
    };
    const itemField: FormFieldConfig = {
      formKey: "item",
      label: "Item",
      type: "select",
      optionsSource: "schema",
      sourceSchemaName: "items",
      sourceRequestFilters: parseRequestFiltersInput("{{product.item._id}}=item._id", {
        formKey: "item",
        sourceSchemaName: "items",
      }),
    };

    const cleanedForm = cleanFormConfig({
      schemaName: "orders",
      fields: [locationField, { ...countListField, sourceFilterBindings: [rule] }],
      fields: [productField, itemField],
    });
    expect(cleanedForm.fields?.[1]?.sourceFilterBindings).toEqual([rule]);
    expect(cleanedForm.fields?.[1]?.sourceRequestFilters).toEqual({
      _id: "{{product.item._id}}",
    });

    const cleanedTable = cleanTableConfig({
      columns: [{ field: "title" }],
      columns: [{ field: "name" }],
      filterPanel: {
        inputs: [locationField, { ...countListField, sourceFilterBindings: [rule] }],
        inputs: [productField, itemField],
      },
      addButton: {
        kind: "create",
        modalType: "form",
        formFields: [locationField, { ...countListField, sourceFilterBindings: [rule] }],
        formFields: [productField, itemField],
      },
      actions: [
        {
          id: "edit",
          kind: "edit",
          modalType: "form",
          formFields: [locationField, { ...countListField, sourceFilterBindings: [rule] }],
          formFields: [productField, itemField],
        },
      ],
      bulkActions: {
        edit: {
          kind: "update",
          modalType: "form",
          formFields: [locationField, { ...countListField, sourceFilterBindings: [rule] }],
          formFields: [productField, itemField],
        },
      },
    });
    expect(cleanedTable.filterPanel?.inputs?.[1]?.sourceFilterBindings).toEqual([rule]);
    expect(cleanedTable.addButton?.formFields?.[1]?.sourceFilterBindings).toEqual([rule]);
    expect(cleanedTable.actions?.[0]?.formFields?.[1]?.sourceFilterBindings).toEqual([rule]);
    expect(cleanedTable.bulkActions?.edit?.formFields?.[1]?.sourceFilterBindings).toEqual([rule]);
    expect(cleanedTable.filterPanel?.inputs?.[1]?.sourceRequestFilters).toEqual({
      _id: "{{product.item._id}}",
    });
    expect(cleanedTable.addButton?.formFields?.[1]?.sourceRequestFilters).toEqual({
      _id: "{{product.item._id}}",
    });
    expect(cleanedTable.actions?.[0]?.formFields?.[1]?.sourceRequestFilters).toEqual({
      _id: "{{product.item._id}}",
    });
    expect(cleanedTable.bulkActions?.edit?.formFields?.[1]?.sourceRequestFilters).toEqual({
      _id: "{{product.item._id}}",
    });

    const matrixConfig: RelationMatrixConfig = {
      rowSchemaName: "count_lists",
      rowSchemaName: "items",
      rowIdField: "_id",
      rowLabelField: "title",
      columnSchemaName: "locations",
      rowLabelField: "name",
      columnSchemaName: "products",
      columnIdField: "_id",
      columnLabelField: "name",
      targetArrayField: "locations",
      targetItemMatchField: "locationId",
      targetArrayField: "products",
      targetItemMatchField: "productId",
      filterPanel: {
        inputs: [locationField, { ...countListField, sourceFilterBindings: [rule] }],
        inputs: [productField, itemField],
      },
    };
    const cleanedMatrix = cleanRelationMatrixConfig(matrixConfig);
    expect(cleanedMatrix?.filterPanel?.inputs?.[1]?.sourceFilterBindings).toEqual([rule]);
    expect(cleanedMatrix?.filterPanel?.inputs?.[1]?.sourceRequestFilters).toEqual({
      _id: "{{product.item._id}}",
    });

    const onMatrixChange = vi.fn();
    render(
      <RelationMatrixFilterEditor
        value={matrixConfig}
        rowFields={containers[1].fields}
        containers={containers}
        onChange={onMatrixChange}
      />,
    );
    expect(screen.getAllByText(/Dependent request filters/i).length).toBeGreaterThan(1);
    expect(screen.queryByText(/Dependent request filters/i)).toBeNull();
    const matrixInputs = screen.getAllByPlaceholderText(
      /\{\{product\.item\._id\}\}=item\._id/i,
    );
    fireEvent.change(matrixInputs[1], {
      target: { value: "{{product.item._id}}=item._id, active=true" },
    });
    expect(onMatrixChange).toHaveBeenCalledWith(
      expect.objectContaining({
        filterPanel: {
          inputs: [
            productField,
            expect.objectContaining({
              sourceRequestFilters: { _id: "{{product.item._id}}", active: true },
            }),
          ],
        },
      }),
    );
  });

  it("blocks saving a component when dependent select filters contain a cycle", async () => {
  it("blocks saving a component when Request filters templates contain a cycle", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const cyclicSections: GridSection[] = [
      {
        columns: 1,
        gap: 12,
        cells: [
          {
            id: "cell-1",
            row: 1,
            column: 1,
            components: [
              {
                id: "cmp_form_1",
                type: "form",
                title: "Order Form",
                dataBinding: { kind: "schema", schemaName: "count_lists" },
                dataBinding: { kind: "schema", schemaName: "items" },
                form: {
                  schemaName: "count_lists",
                  schemaName: "items",
                  fields: [
                    {
                      formKey: "location",
                      formKey: "product",
                      type: "select",
                      optionsSource: "schema",
                      sourceSchemaName: "locations",
                      sourceFilterBindings: [
                        {
                          id: "r1",
                          field: "code",
                          operator: "eq",
                          value: { source: "field", fieldKey: "countList" },
                        },
                      ],
                      sourceSchemaName: "products",
                      sourceRequestFilters: {
                        item: "{{item._id}}",
                      },
                    },
                    {
                      formKey: "countList",
                      formKey: "item",
                      type: "select",
                      optionsSource: "schema",
                      sourceSchemaName: "count_lists",
                      sourceFilterBindings: [
                        {
                          id: "r2",
                          field: "location",
                          operator: "eq",
                          value: { source: "field", fieldKey: "location" },
                        },
                      ],
                      sourceSchemaName: "items",
                      sourceRequestFilters: {
                        _id: "{{product.item._id}}",
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ];

    render(<PageDesigner sections={cyclicSections} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /^Section 1/i }));
    await user.click(screen.getByTitle("Edit Component"));
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    await waitFor(() =>
      expect(
        screen.getAllByRole("alert").some((el) => /cycle/i.test(el.textContent || "")),
      ).toBe(true),
    );
    expect(onChange).not.toHaveBeenCalled();
  });
});
