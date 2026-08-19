import { describe, expect, it } from "vitest";
import { ComponentBlock, GridSection } from "../../types/page";
import { commitDesignerComponent } from "./componentCommit";

describe("commitDesignerComponent", () => {
  it("persists the updated component sections before returning", async () => {
    const sections: GridSection[] = [{
      columns: 1,
      cells: [{ id: "cell-1", row: 1, column: 1, components: [{ id: "form-1", type: "form" }] }],
    }];
    const component: ComponentBlock = {
      id: "form-1",
      type: "form",
      form: {
        schemaName: "orders",
        fields: [{
          formKey: "productId",
          type: "select",
          sourceDataFields: ["price"],
          optionDisplay: { leftTemplate: "{{name}}", rightTemplate: "{{price}} ₺" },
        }],
      },
    };
    let persisted: GridSection[] | undefined;

    const result = await commitDesignerComponent({
      sections,
      cellId: "cell-1",
      component,
      editingComponentId: "form-1",
      persist: async (next) => { persisted = next; },
    });

    expect(persisted).toEqual(result);
    expect(persisted?.[0].cells[0].components[0].form?.fields?.[0].sourceDataFields)
      .toEqual(["price"]);
  });
});
