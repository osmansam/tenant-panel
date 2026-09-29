// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CreateContainerModal } from "./CreateContainerModal";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (value: string) => value }),
}));

vi.mock("../../../utils/api/container", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("../../../utils/api/container")
  >();
  return {
    ...actual,
    useCreateContainer: () => ({
      createContainer: vi.fn(),
      isCreating: false,
    }),
  };
});

describe("CreateContainerModal", () => {
  it("presents collection terminology without changing the internal API", () => {
    render(<CreateContainerModal isOpen onClose={vi.fn()} />);

    const dialog = screen.getByRole("dialog", { name: "Create New Collection" });
    expect(screen.getByRole("button", { name: "Create Collection" })).toBeDisabled();
    expect(screen.getByPlaceholderText("Enter collection schema name")).toBeInTheDocument();
    expect(dialog).not.toHaveTextContent(/\bcontainers?\b/i);
  });
});
