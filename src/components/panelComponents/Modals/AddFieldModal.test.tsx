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
  it("shows the edited field and collection context", async () => {
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

    const dialog = await screen.findByRole("dialog", { name: "Edit field: product" });
    expect(dialog).toBeInTheDocument();
    expect(dialog.children.item(1)).toHaveClass("min-w-0");
    expect(screen.getByRole("heading", { name: "Edit field: product" }).firstElementChild).toHaveClass(
      "break-all",
      "sm:break-normal",
    );
    expect(screen.getByText(/collection: stock/i)).toHaveClass(
      "break-all",
      "sm:break-normal",
    );
    expect(
      screen.getByRole("textbox", { name: /^field name\s*\*/i }),
    ).toHaveValue("product");
    expect(screen.getByText(/collection: stock/i)).toBeInTheDocument();
    expect(dialog).not.toHaveTextContent(/\bcontainers?\b/i);

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

  it("uses plain separated editor sections instead of nested cards", async () => {
    render(
      <AddFieldModal
        isOpen
        onClose={vi.fn()}
        onAddField={vi.fn().mockResolvedValue(true)}
        containerName="stock"
      />,
    );

    const basicSection = (await screen.findByRole("heading", {
      name: "Basic information",
    })).closest("section");
    expect(basicSection).toHaveAttribute("data-surface", "plain");
    expect(basicSection).toHaveClass("border-b", "border-ui-border");
    expect(basicSection).not.toHaveClass("rounded-ui-lg");
  });
});
