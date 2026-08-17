import { describe, expect, it } from "vitest";
import type { Field } from "../../../utils/api/container";
import * as addFieldModal from "./AddFieldModal";

describe("AddFieldModal child fields", () => {
  it("preserves the selected object schema when saving an Object ID child", () => {
    const buildChildField = (
      addFieldModal as unknown as {
        buildChildField?: (draft: Partial<Field>, enumValues: string) => Field;
      }
    ).buildChildField;

    const result = buildChildField?.(
      {
        name: "productId",
        type: "objectId",
        objectSchemaName: "products",
        isSearchable: true,
      },
      ""
    );

    expect(result).toMatchObject({
      name: "productId",
      type: "objectId",
      objectSchemaName: "products",
    });
  });

  it("preserves the selected object schema when saving an Object ID Array child", () => {
    const buildChildField = (
      addFieldModal as unknown as {
        buildChildField?: (draft: Partial<Field>, enumValues: string) => Field;
      }
    ).buildChildField;

    const result = buildChildField?.(
      {
        name: "productIds",
        type: "objectIdArray",
        objectSchemaName: "products",
      },
      ""
    );

    expect(result).toMatchObject({
      name: "productIds",
      type: "objectIdArray",
      objectSchemaName: "products",
    });
  });
});
