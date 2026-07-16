import { describe, expect, it } from "vitest";
import { buildFormSubmitRequestBody } from "./formConfig";
import { FormComponentConfig } from "../types/page";

describe("buildFormSubmitRequestBody", () => {
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
