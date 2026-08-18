import { describe, expect, it } from "vitest";
import { buildFormSubmitRequestBody } from "./formConfig";
import { FormComponentConfig } from "../types/page";

describe("buildFormSubmitRequestBody", () => {
  it("includes calculated targets while excluding transient picker fields", () => {
    const form: FormComponentConfig = {
      schemaName: "davinciOrder",
      fields: [
        { formKey: "productId", label: "Product", type: "select" },
        { formKey: "quantity", label: "Quantity", type: "number" },
      ],
      objectLists: [{
        key: "items",
        itemFields: ["productId", "quantity"],
        fieldMappings: [{ sourceFormKey: "productId", sourceField: "price", targetField: "unitPrice", required: true }],
        itemCalculations: [{ operation: "multiply", inputs: ["unitPrice", "quantity"], targetField: "lineTotal", precision: 2 }],
        addAction: { kind: "addObject", targetObjectList: "items", sourceFields: ["productId", "quantity"] },
      }],
      summaries: [
        { key: "subtotal", operation: "sum", objectListKey: "items", sourceField: "lineTotal", targetField: "subtotal" },
        { key: "total", operation: "copy", sourceField: "subtotal", targetField: "total" },
      ],
      submit: { mode: "workflow", workflowSchema: "davinciOrder", workflowName: "create-davinci-order" },
    };
    expect(buildFormSubmitRequestBody(form, {
      productId: "transient", quantity: 9,
      items: [{ productId: "p1", quantity: 3, unitPrice: 19.99, lineTotal: 59.97, name: "Tea" }],
      subtotal: 59.97, total: 59.97,
    })).toEqual({ record: {
      items: [{ productId: "p1", quantity: 3, unitPrice: 19.99, lineTotal: 59.97 }],
      subtotal: 59.97, total: 59.97,
    } });
  });
  it("sends the selected object list as a raw array for bulk workflow submits", () => {
    const form: FormComponentConfig = {
      schemaName: "davinciOrder",
      fields: [
        { id: "product", formKey: "productId", label: "Product", type: "select" },
        { id: "quantity", formKey: "quantity", label: "Quantity", type: "number" },
      ],
      objectLists: [
        {
          key: "products",
          title: "Products",
          itemFields: ["productId", "quantity"],
        },
      ],
      submit: {
        mode: "workflow",
        workflowSchema: "davinciOrder",
        workflowName: "create-davinci-order",
        bulkObjectListKey: "products",
      },
    };

    const body = buildFormSubmitRequestBody(form, {
      products: [
        { productId: "6a56770742b009c32a92d202", quantity: 1 },
        { productId: "6a56770742b009c32a92d1f8", quantity: 2 },
      ],
    });

    expect(body).toEqual([
      { productId: "6a56770742b009c32a92d202", quantity: 1 },
      { productId: "6a56770742b009c32a92d1f8", quantity: 2 },
    ]);
  });

  it("wraps current form fields in an items array for bulk workflow submits without an object list", () => {
    const form: FormComponentConfig = {
      schemaName: "davinciOrder",
      fields: [
        { id: "product", formKey: "productId", label: "Product", type: "select" },
        { id: "quantity", formKey: "quantity", label: "Quantity", type: "number" },
      ],
      submit: {
        mode: "workflow",
        workflowSchema: "davinciOrder",
        workflowName: "create-davinci-order",
        bulkObjectListKey: "items",
      },
    };

    const body = buildFormSubmitRequestBody(form, {
      productId: "6a56770742b009c32a92d202",
      quantity: 1,
    });

    expect(body).toEqual([
      { productId: "6a56770742b009c32a92d202", quantity: 1 },
    ]);
  });
});
