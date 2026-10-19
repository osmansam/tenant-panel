// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WorkspaceDialog } from "../../ui";
import { AddPipelineModal } from "./AddPipelineModal";
import { AddWorkflowModal } from "./AddWorkflowModal";
import { AddDynamicApiModal } from "./AddDynamicApiModal";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock("../../../utils/api/roleInfo", () => ({ useRoleItems: () => ({ data: [] }) }));

const editors = [
  ["pipeline", AddPipelineModal, { onAddPipeline: vi.fn() }, "Pipeline Name"],
  ["workflow", AddWorkflowModal, { onAddWorkflow: vi.fn() }, "Workflow Name"],
  ["API", AddDynamicApiModal, { onAddDynamicApi: vi.fn() }, "API Name"],
] as const;

describe("collection nested editors", () => {
  it.each(editors)("keeps the %s editor interactive above its parent", async (_name, Editor, callback, label) => {
    const close = vi.fn();
    render(<><WorkspaceDialog open onClose={vi.fn()} title="Collection details">Parent content</WorkspaceDialog><Editor isOpen onClose={close} {...callback as any} /></>);
    const input = screen.getByLabelText(new RegExp(label));
    expect(input.closest("[inert]")).toBeNull();
    expect(input.closest('[role="dialog"]')).not.toBeNull();
    await waitFor(() => expect(screen.getAllByRole("dialog").length).toBe(2));
    await userEvent.type(input, "example");
    expect(input).toHaveValue("example");
    await userEvent.keyboard("{Escape}");
    expect(close).toHaveBeenCalledOnce();
  });

  it("names pipeline configuration and authorization controls", () => {
    render(<AddPipelineModal isOpen onClose={vi.fn()} onAddPipeline={vi.fn()} />);
    expect(screen.getByRole("textbox", { name: /Pipeline JSON/ })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "Require Authorization" })).toHaveAttribute("aria-checked", "false");
  });

  it("names workflow JSON fields and API method selection", () => {
    const { unmount } = render(<AddWorkflowModal isOpen onClose={vi.fn()} onAddWorkflow={vi.fn()} />);
    expect(screen.getByRole("textbox", { name: "Payload" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Conditions" })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "Stop On Error" })).toBeInTheDocument();
    unmount();
    render(<AddDynamicApiModal isOpen onClose={vi.fn()} onAddDynamicApi={vi.fn()} />);
    expect(screen.getByRole("combobox", { name: /HTTP Method/ })).toBeInTheDocument();
  });

});
