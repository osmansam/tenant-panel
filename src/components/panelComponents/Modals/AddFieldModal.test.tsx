// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Field } from "../../../utils/api/container";
import { AddFieldModal } from "./AddFieldModal";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, values?: Record<string, string>) =>
      Object.entries(values || {}).reduce(
        (text, [name, value]) => text.replace(`{{${name}}}`, value),
        key,
      ),
  }),
}));

vi.mock("../../../utils/api/container", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("../../../utils/api/container")
  >();
  return {
    ...actual,
    useGetContainers: () => [
      {
        id: "product-container",
        schemaName: "product",
        fields: [{ name: "name", type: "string" }],
      },
    ],
  };
});

describe("AddFieldModal", () => {
  it("shows the edited field and container context", async () => {
    const { rerender } = render(
      <AddFieldModal
        isOpen
        onClose={vi.fn()}
        onAddField={vi.fn().mockResolvedValue(true)}
        containerName="stock"
        editField={{
          name: "product",
          type: "objectId",
          objectSchemaName: "product",
          isSearchable: true,
        }}
      />,
    );

    expect(
      await screen.findByRole("dialog", { name: "Edit field: product" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /^field name\s*\*/i }),
    ).toHaveValue("product");
    expect(screen.getByText(/container: stock/i)).toBeInTheDocument();

    rerender(
      <AddFieldModal
        isOpen
        onClose={vi.fn()}
        onAddField={vi.fn().mockResolvedValue(true)}
        containerName="stock"
        editField={{ name: "quantity", type: "int" }}
      />,
    );

    expect(
      await screen.findByRole("dialog", { name: "Edit field: quantity" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /^field name\s*\*/i }),
    ).toHaveValue("quantity");
  });

  it("preserves the Field callback payload while editing", async () => {
    const user = userEvent.setup();
    const onAddField = vi.fn().mockResolvedValue(false);
    const editField: Field = {
      name: "quantity",
      type: "int",
      tag: "required",
      unique: true,
      isSearchable: true,
      isLoginCredential: false,
      isAuditIdentity: true,
      isHashed: false,
      isForceDelete: false,
      equation: "price * count",
    };

    render(
      <AddFieldModal
        isOpen
        onClose={vi.fn()}
        onAddField={onAddField}
        containerName="stock"
        containerFields={[editField]}
        editField={editField}
      />,
    );

    await user.click(
      await screen.findByRole("button", { name: "Update Field" }),
    );

    await waitFor(() =>
      expect(onAddField).toHaveBeenCalledWith({
        name: "quantity",
        type: "int",
        tag: "required",
        unique: true,
        isSearchable: true,
        isLoginCredential: false,
        isAuditIdentity: true,
        isHashed: false,
        isForceDelete: false,
        enumList: undefined,
        equation: "price * count",
        children: undefined,
        objectSchemaName: undefined,
        populationSettings: undefined,
      }),
    );
  });

  it("keeps the primary nested-editor action reachable on narrow screens", async () => {
    render(
      <AddFieldModal
        isOpen
        onClose={vi.fn()}
        onAddField={vi.fn().mockResolvedValue(true)}
        containerName="stock"
      />,
    );

    const submit = await screen.findByRole("button", { name: "Add Field" });
    expect(submit.parentElement).toHaveClass("flex-col-reverse");
    expect(submit).toHaveAttribute("data-primary-action", "true");
  });
});
