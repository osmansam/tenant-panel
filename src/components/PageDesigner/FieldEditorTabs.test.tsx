// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { Input } from "../ui";
import FieldEditorTabs from "./FieldEditorTabs";

function Editor() {
  const [fields, setFields] = useState([
    { formKey: "title", label: "Title" },
    { formKey: "status", label: "Status" },
    { formKey: "category", label: "Category" },
  ]);
  return (
    <>
      <button onClick={() => setFields((current) => [...current, { formKey: "", label: "" }])}>Add field</button>
      <FieldEditorTabs fields={fields} label="Fields">
        {(field, index) => (
          <>
            <Input aria-label="Form key" defaultValue={field.formKey} />
            <button onClick={() => setFields((current) => current.filter((_, fieldIndex) => fieldIndex !== index))}>Remove field</button>
            <button disabled={index === 0} onClick={() => setFields((current) => {
              const reordered = [...current];
              [reordered[index - 1], reordered[index]] = [reordered[index], reordered[index - 1]];
              return reordered;
            })}>Move up</button>
          </>
        )}
      </FieldEditorTabs>
    </>
  );
}

describe("FieldEditorTabs", () => {
  it("opens a newly added field and falls back to a remaining field when removed", async () => {
    const user = userEvent.setup();
    render(<Editor />);
    await user.click(screen.getByRole("button", { name: "Add field" }));
    expect(screen.getByRole("tab", { name: "Field 4" })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("button", { name: "Remove field" }));
    expect(screen.getByRole("tab", { name: "Category" })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("tab", { name: "Title" }));
    await user.click(screen.getByRole("button", { name: "Remove field" }));
    expect(screen.getByRole("tab", { name: "Status" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("textbox", { name: "Form key" })).toHaveValue("status");
    await user.click(screen.getByRole("button", { name: "Remove field" }));
    await user.click(screen.getByRole("button", { name: "Remove field" }));
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add field" }));
    expect(screen.getByRole("tabpanel", { name: "Field 1" })).toBeVisible();
  });

  it("keeps the selected field open when it moves", async () => {
    const user = userEvent.setup();
    render(<Editor />);
    await user.click(screen.getByRole("tab", { name: "Category" }));
    await user.click(screen.getByRole("button", { name: "Move up" }));
    expect(screen.getByRole("tab", { name: "Category" })).toHaveAttribute("aria-selected", "true");
    expect(within(screen.getByRole("tabpanel", { name: "Category" })).getByRole("textbox", { name: "Form key" })).toHaveValue("category");
  });
});
