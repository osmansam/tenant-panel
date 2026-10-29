// @vitest-environment jsdom
import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, it, vi } from "vitest";
import { axiosClient } from "../../utils/api/axiosClient";
import { SharedCredentialForm } from "./SharedCredentialForm";
vi.mock("../../utils/api/axiosClient", () => ({ axiosClient: { post: vi.fn() } }));
it("releases parent saving state when a successful real mutation unmounts the secret form", async () => {
 let finish: (value: unknown) => void = () => {};
 vi.mocked(axiosClient.post).mockReturnValueOnce(new Promise(resolve => { finish = resolve; }) as any);
 function Harness() { const [saving, setSaving] = useState(false); const [open, setOpen] = useState(true); return <>{open && <SharedCredentialForm onSavingChange={setSaving} onSaved={() => setOpen(false)} onCancel={() => setOpen(false)} />}<button disabled={saving}>Submit project</button></>; }
 render(<QueryClientProvider client={new QueryClient()}><Harness /></QueryClientProvider>); const user = userEvent.setup();
 await user.type(screen.getByLabelText("Credential name"), "Vendor"); await user.type(screen.getByLabelText("External API token"), "secret"); await user.type(screen.getByLabelText("Allowed domains"), "api.vendor.com"); await user.click(screen.getByRole("button", { name: "Save shared credential" }));
 await waitFor(() => expect(screen.getByRole("button", { name: "Submit project" })).toBeDisabled());
 finish({ data: { data: { credential: { id: "new", scope: "tenant" } } } });
 await waitFor(() => expect(screen.queryByLabelText("External API token")).not.toBeInTheDocument());
 expect(screen.getByRole("button", { name: "Submit project" })).toBeEnabled();
});
