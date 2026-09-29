// @vitest-environment jsdom

import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GenericButton } from "./GenericButton";

describe("GenericButton compatibility wrapper", () => {
  it("forwards its legacy HTML contract through shared Button geometry", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();

    render(
      <GenericButton
        ref={ref}
        fullWidth
        className="consumer-class"
        data-testid="legacy-button"
        onClick={onClick}
      >
        Continue
      </GenericButton>,
    );

    const button = screen.getByRole("button", { name: "Continue" });
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-testid", "legacy-button");
    expect(button).toHaveClass(
      "consumer-class",
      "h-ui-md",
      "rounded-ui-md",
      "ui-focus-ring",
      "w-full",
    );

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("maps legacy variant names onto shared semantic variants", () => {
    render(
      <>
        <GenericButton variant="danger">Delete</GenericButton>
        <GenericButton variant="black">Create</GenericButton>
        <GenericButton variant="clear" aria-label="Clear">×</GenericButton>
      </>,
    );

    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
      "bg-ui-danger",
    );
    expect(screen.getByRole("button", { name: "Create" })).toHaveClass(
      "bg-ui-primary",
    );
    expect(screen.getByRole("button", { name: "Clear" })).toHaveClass(
      "absolute",
      "h-ui-sm",
      "aspect-square",
      "p-0",
      "ui-focus-ring",
    );
    expect(screen.getByRole("button", { name: "Clear" })).not.toHaveClass(
      "w-fit",
    );
  });

  it("preserves visible loading copy while disabling interaction and hiding icons", () => {
    render(
      <GenericButton
        isLoading
        iconLeft={<span data-testid="left-icon" />}
        iconRight={<span data-testid="right-icon" />}
      >
        Saving changes
      </GenericButton>,
    );

    const button = screen.getByRole("button", { name: "Saving changes" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Saving changes")).toBeVisible();
    expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
  });

  it("preserves a caller-managed native busy state when it is not loading", () => {
    render(<GenericButton aria-busy="true">Background task</GenericButton>);

    expect(
      screen.getByRole("button", { name: "Background task" }),
    ).toHaveAttribute("aria-busy", "true");
  });
});
