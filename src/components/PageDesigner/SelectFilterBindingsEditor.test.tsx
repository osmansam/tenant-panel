// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { FormFieldConfig, GridSection, RelationMatrixConfig } from "../../types/page";
import { cleanRelationMatrixConfig } from "../../utils/relationMatrixConfig";
import { parseRequestFiltersInput } from "../../utils/requestFilterTemplates";
import FormFieldEditor from "./FormFieldEditor";
import { cleanFormConfig, cleanTableConfig, PageDesigner } from "./PageDesigner";
import RelationMatrixFilterEditor from "./RelationMatrixRowFilterEditor";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock("../../utils/api/container", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../utils/api/container")>()),
  useGetContainers: () => [
    {
      schemaName: "products",
      fields: [
        { name: "name", type: "string" },
        { name: "item", type: "objectId" },
      ],
    },
    {
      schemaName: "items",
      fields: [
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
    schemaName: "products",
    fields: [
      { name: "name", type: "string" },
      { name: "item", type: "objectId" },
    ],
  },
  {
    schemaName: "items",
    fields: [
      { name: "name", type: "string" },
      { name: "code", type: "string" },
      { name: "active", type: "boolean" },
    ],
  },
];

describe("Request filters template syntax and Tenant Panel serialization", () => {
  it("parses {{product.item._id}}=item._id and JSON templates directly in Request filters without a separate dependent-filter editor", () => {
    const onFormFieldChange = vi.fn();
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
    };

    render(
      <FormFieldEditor
        field={itemField}
        index={1}
        containers={containers}
        formFields={[productField, itemField]}
        onChange={onFormFieldChange}
        onRemove={vi.fn()}
      />,
    );

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
      fields: [productField, itemField],
    });
    expect(cleanedForm.fields?.[1]?.sourceRequestFilters).toEqual({
      _id: "{{product.item._id}}",
    });

    const cleanedTable = cleanTableConfig({
      columns: [{ field: "name" }],
      filterPanel: {
        inputs: [productField, itemField],
      },
      addButton: {
        kind: "create",
        modalType: "form",
        formFields: [productField, itemField],
      },
      actions: [
        {
          id: "edit",
          kind: "edit",
          modalType: "form",
          formFields: [productField, itemField],
        },
      ],
      bulkActions: {
        edit: {
          kind: "update",
          modalType: "form",
          formFields: [productField, itemField],
        },
      },
    });
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
      rowSchemaName: "items",
      rowIdField: "_id",
      rowLabelField: "name",
      columnSchemaName: "products",
      columnIdField: "_id",
      columnLabelField: "name",
      targetArrayField: "products",
      targetItemMatchField: "productId",
      filterPanel: {
        inputs: [productField, itemField],
      },
    };
    const cleanedMatrix = cleanRelationMatrixConfig(matrixConfig);
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
                dataBinding: { kind: "schema", schemaName: "items" },
                form: {
                  schemaName: "items",
                  fields: [
                    {
                      formKey: "product",
                      type: "select",
                      optionsSource: "schema",
                      sourceSchemaName: "products",
                      sourceRequestFilters: {
                        item: "{{item._id}}",
                      },
                    },
                    {
                      formKey: "item",
                      type: "select",
                      optionsSource: "schema",
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
