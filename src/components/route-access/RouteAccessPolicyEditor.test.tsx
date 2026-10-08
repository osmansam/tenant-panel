// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RouteAccessPolicyEditor } from "./RouteAccessPolicyEditor";

const fields = [
  { name: "ownerId", type: "objectId" },
  { name: "status", type: "string" },
];

describe("RouteAccessPolicyEditor", () => {
  it("adds assignments and allow rules, then saves a normalized policy", async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();
    render(
      <RouteAccessPolicyEditor
        open
        routeName="CreateDynamicModelItem"
        fields={fields}
        onClose={vi.fn()}
        onSave={onSave}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Add assignment" }));
    await user.selectOptions(screen.getByLabelText("Assignment field 1"), "ownerId");
    fireEvent.change(screen.getByLabelText("Assignment value 1"), {
      target: { value: "{{auth.user.id}}" },
    });

    await user.click(screen.getByRole("button", { name: "Add allow rule" }));
    await user.selectOptions(screen.getByLabelText("Rule source 1"), "context");
    await user.selectOptions(screen.getByLabelText("Rule context 1"), "{{auth.user.role}}");
    await user.clear(screen.getByLabelText("Rule value 1"));
    await user.type(screen.getByLabelText("Rule value 1"), "admin");
    await user.click(screen.getByRole("button", { name: "Save policy" }));

    expect(onSave).toHaveBeenCalledWith({
      assign: { ownerId: "{{auth.user.id}}" },
      any: [{ context: "{{auth.user.role}}", operator: "eq", value: "admin" }],
    });
  });

  it("blocks invalid rules and cancels without mutation", async () => {
    const onSave = vi.fn();
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <RouteAccessPolicyEditor
        open
        routeName="UpdateDynamicModelItem"
        fields={fields}
        onClose={onClose}
        onSave={onSave}
      />,
    );
    expect(screen.queryByRole("button", { name: "Add assignment" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add allow rule" }));
    await user.selectOptions(screen.getByLabelText("Rule operator 1"), "in");
    await user.type(screen.getByLabelText("Rule value 1"), "open");
    await user.click(screen.getByRole("button", { name: "Save policy" }));
    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByText(/requires a JSON array/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("removes an existing policy cleanly", async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();
    render(
      <RouteAccessPolicyEditor
        open
        routeName="DeleteDynamicModelItem"
        fields={fields}
        policy={{ any: [{ field: "ownerId", operator: "eq", value: "{{auth.user.id}}" }] }}
        onClose={vi.fn()}
        onSave={onSave}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Remove policy" }));
    expect(onSave).toHaveBeenCalledWith(undefined);
  });
});
