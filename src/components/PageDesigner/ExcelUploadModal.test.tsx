// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ExcelUploadModal } from "./ExcelUploadModal";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (value: string) => value }),
}));

vi.mock("../../utils/api/container", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("../../utils/api/container")
  >();
  return {
    ...actual,
    useUploadExcel: () => ({
      uploadExcel: vi.fn(),
      isUploading: false,
      uploadResult: null,
    }),
  };
});

describe("ExcelUploadModal", () => {
  it("describes the generated schema as a collection", () => {
    render(<ExcelUploadModal isOpen onClose={vi.fn()} />);

    expect(
      screen.getByText("This will be the name of the collection/schema created from your data"),
    ).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(/\bcontainers?\b/i);
  });
});
