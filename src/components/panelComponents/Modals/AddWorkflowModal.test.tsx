// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AddWorkflowModal } from "./AddWorkflowModal";
import type { DynamicWorkflow } from "../../../utils/api/container";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock("../../../utils/api/roleInfo", () => ({ useRoleItems: () => ({ data: [] }) }));
vi.mock("react-toastify", () => ({ toast: { error: vi.fn() } }));

const pageWorkflow = {
  name: "loadPublicPage", trigger: "manual", mode: "transactional", isActive: true,
  isRedisCached: true, cacheTime: 7, isAuthenticated: false, isAuthorized: false,
  steps: [{ name: "page", type: "aggregate", config: { pipeline: [{ $limit: 1 }] } }],
} as DynamicWorkflow;

describe("workflow caching controls", () => {
  it("keeps new workflows uncached by default", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockResolvedValue(true);
    render(<AddWorkflowModal isOpen onClose={vi.fn()} onAddWorkflow={save} />);
    expect(screen.getByRole("switch", { name: "Cache Results" })).toHaveAttribute("aria-checked", "false");
    expect(screen.queryByRole("spinbutton", { name: "Cache Duration (minutes)" })).not.toBeInTheDocument();
    await user.type(screen.getByRole("textbox", { name: /Workflow Name/ }), "loadPublicPage");
    await user.click(screen.getByRole("button", { name: "Add Workflow" }));
    await waitFor(() => expect(save).toHaveBeenCalledWith(expect.objectContaining({ isRedisCached: false, cacheTime: 0 })));
  });

  it("enables caching and saves its duration in minutes without changing authentication", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockResolvedValue(true);
    render(<AddWorkflowModal isOpen onClose={vi.fn()} onAddWorkflow={save} />);
    await user.type(screen.getByRole("textbox", { name: /Workflow Name/ }), "loadPublicPage");
    await user.click(screen.getByRole("switch", { name: "Cache Results" }));
    fireEvent.change(screen.getByRole("spinbutton", { name: "Cache Duration (minutes)" }), { target: { value: "5" } });
    await user.click(screen.getByRole("button", { name: "Add Workflow" }));
    await waitFor(() => expect(save).toHaveBeenCalledWith(expect.objectContaining({ isRedisCached: true, cacheTime: 5, isAuthenticated: false, isAuthorized: false })));
  });

  it("preserves existing settings and JSON after a rejected save, and lets caching be disabled", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockResolvedValue(false);
    const close = vi.fn();
    render(<AddWorkflowModal isOpen onClose={close} onAddWorkflow={save} editWorkflow={pageWorkflow} />);
    expect(screen.getByRole("switch", { name: "Cache Results" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("spinbutton", { name: "Cache Duration (minutes)" })).toHaveValue(7);
    await user.click(screen.getByRole("button", { name: "Update Workflow" }));
    await waitFor(() => expect(save).toHaveBeenLastCalledWith(expect.objectContaining({ isRedisCached: true, cacheTime: 7, steps: pageWorkflow.steps })));
    expect(close).not.toHaveBeenCalled();
    await user.click(screen.getByRole("switch", { name: "Cache Results" }));
    await user.click(screen.getByRole("button", { name: "Update Workflow" }));
    await waitFor(() => expect(save).toHaveBeenLastCalledWith(expect.objectContaining({ isRedisCached: false, cacheTime: 7 })));
  });

  it.each(["-1", "1.5", "153722868"])("rejects invalid cache duration %s instead of truncating it", async (value) => {
    const user = userEvent.setup();
    const save = vi.fn();
    render(<AddWorkflowModal isOpen onClose={vi.fn()} onAddWorkflow={save} editWorkflow={pageWorkflow} />);
    fireEvent.change(screen.getByRole("spinbutton", { name: "Cache Duration (minutes)" }), { target: { value } });
    await user.click(screen.getByRole("button", { name: "Update Workflow" }));
    expect(save).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("whole number of minutes");
  });

  it("preserves zero as the backend default duration", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockResolvedValue(false);
    render(<AddWorkflowModal isOpen onClose={vi.fn()} onAddWorkflow={save} editWorkflow={{ ...pageWorkflow, cacheTime: 0 }} />);
    expect(screen.getByRole("spinbutton", { name: "Cache Duration (minutes)" })).toHaveValue(0);
    await user.click(screen.getByRole("button", { name: "Update Workflow" }));
    await waitFor(() => expect(save).toHaveBeenCalledWith(expect.objectContaining({ isRedisCached: true, cacheTime: 0 })));
  });

  it("can disable caching after entering an invalid duration", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockResolvedValue(false);
    render(<AddWorkflowModal isOpen onClose={vi.fn()} onAddWorkflow={save} editWorkflow={pageWorkflow} />);
    fireEvent.change(screen.getByRole("spinbutton", { name: "Cache Duration (minutes)" }), { target: { value: "-1" } });
    await user.click(screen.getByRole("button", { name: "Update Workflow" }));
    expect(save).not.toHaveBeenCalled();
    await user.click(screen.getByRole("switch", { name: "Cache Results" }));
    await user.click(screen.getByRole("button", { name: "Update Workflow" }));
    await waitFor(() => expect(save).toHaveBeenCalledWith(expect.objectContaining({ isRedisCached: false, cacheTime: 0 })));
  });

  it("retains authentication and roles when cache settings change", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockResolvedValue(false);
    render(<AddWorkflowModal isOpen onClose={vi.fn()} onAddWorkflow={save} editWorkflow={{ ...pageWorkflow, isAuthenticated: true, isAuthorized: true, authorizeRole: ["editor"] }} />);
    await user.click(screen.getByRole("switch", { name: "Cache Results" }));
    await user.click(screen.getByRole("button", { name: "Update Workflow" }));
    await waitFor(() => expect(save).toHaveBeenCalledWith(expect.objectContaining({ isRedisCached: false, cacheTime: 7, isAuthenticated: true, isAuthorized: true, authorizeRole: ["editor"] })));
  });
});
