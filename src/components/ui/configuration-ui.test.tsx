// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Switch, Tabs, TabsContent, TabsList, TabsTrigger } from ".";

describe("configuration UI", () => {
  it("renders a controlled switch with label, description, and disabled behavior", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Switch
        checked={false}
        onCheckedChange={onCheckedChange}
        label="Enable localization for every newly created record"
        description="Editors can provide translated values."
      />,
    );

    const control = screen.getByRole("switch", { name: /Enable localization/ });
    expect(control).toHaveAttribute("aria-checked", "false");
    expect(control).toHaveAccessibleDescription("Editors can provide translated values.");
    await user.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("does not change a disabled switch", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch checked disabled onCheckedChange={onCheckedChange} label="Locked" />);
    await user.click(screen.getByRole("switch", { name: "Locked" }));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("supports controlled selection and roving keyboard focus", async () => {
    const user = userEvent.setup();
    const Harness = () => {
      const [value, setValue] = useState("general");
      return (
        <Tabs value={value} onValueChange={setValue}>
          <TabsList aria-label="Configuration sections">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value="general">General panel</TabsContent>
          <TabsContent value="security">Security panel</TabsContent>
          <TabsContent value="advanced">Advanced panel</TabsContent>
        </Tabs>
      );
    };

    render(<Harness />);
    const general = screen.getByRole("tab", { name: "General" });
    general.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Security" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Security" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Security panel");
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Advanced" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(general).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Advanced" })).toHaveFocus();
  });
});
