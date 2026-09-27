// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Field,
  FieldGroup,
  Skeleton,
  Toolbar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from ".";

describe("Toolbar", () => {
  it("renders with toolbar role and children", () => {
    render(
      <Toolbar aria-label="Container actions">
        <button type="button">Search</button>
        <button type="button">Filter</button>
      </Toolbar>,
    );

    const toolbar = screen.getByRole("toolbar", { name: "Container actions" });
    expect(toolbar).toContainElement(
      screen.getByRole("button", { name: "Search" }),
    );
    expect(toolbar).toContainElement(
      screen.getByRole("button", { name: "Filter" }),
    );
  });
});

describe("Field", () => {
  it("links label, control, error, and description via ARIA ids", () => {
    render(
      <Field
        label="Email address"
        description="Your primary email"
        error="Email is required"
        required
      >
        {(a) => (
          <input
            id={a.controlId}
            aria-invalid={a.invalid || undefined}
            aria-describedby={a.describedBy}
          />
        )}
      </Field>,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");

    const label = screen.getByText(/Email address/);
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("for", input.id);

    expect(screen.getByText("Email is required")).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(screen.getByText("Your primary email")).toBeInTheDocument();
    expect(screen.getByText("required")).toHaveClass("sr-only");
  });

  it("shows optional label when field is not required", () => {
    render(
      <Field label="Nickname" optionalLabel="(optional)">
        {(a) => <input id={a.controlId} />}
      </Field>,
    );

    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });
});

describe("FieldGroup", () => {
  it("renders children in a grid", () => {
    const { container } = render(
      <FieldGroup columns={2} data-testid="group">
        <div>Field 1</div>
        <div>Field 2</div>
      </FieldGroup>,
    );

    const grid = container.firstElementChild as HTMLElement;
    expect(grid.className).toContain("grid");
    expect(grid.className).toContain("sm:grid-cols-2");
  });
});

describe("Skeleton", () => {
  it("renders with animation class and aria-hidden", () => {
    const { container } = render(<Skeleton className="h-6 w-32" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el.className).toContain("animate-pulse");
  });
});

describe("DropdownMenu", () => {
  it("opens on click and renders items", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive onClick={onDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByRole("button", { name: "Actions" }));

    const editItem = screen.getByRole("menuitem", { name: "Edit" });
    expect(editItem).toBeInTheDocument();

    await user.click(editItem);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("closes with Escape", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
  });
});
