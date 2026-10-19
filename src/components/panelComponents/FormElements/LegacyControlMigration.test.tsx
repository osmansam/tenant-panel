// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CreateWithJsonModal } from "../Modals/CreateWithJsonModal";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("legacy shared-control migration", () => {
  it("keeps JSON modal submission behavior while using the shared textarea", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    render(
      <CreateWithJsonModal
        isOpen
        title="Create with JSON"
        description="Paste a payload"
        submitLabel="Create"
        initialJson={{ name: "before" }}
        validate={() => null}
        normalize={(payload) => ({ ...payload, normalized: true })}
        onSubmit={onSubmit}
        onClose={onClose}
      />,
    );

    const textarea = screen.getByLabelText("JSON payload");
    expect(textarea).toHaveAttribute("data-control-size", "md");
    await user.clear(textarea);
    await user.paste('{"name":"after"}');
    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmit).toHaveBeenCalledWith({ name: "after", normalized: true });
    expect(onClose).toHaveBeenCalledOnce();
  });
});
