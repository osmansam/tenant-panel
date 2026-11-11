// Standalone library fixture; all API data stays in memory.
async (page) => {
  const document = {
    version: 2, id: "fixture-document", name: "Inventory visual",
    root: { id: "fixture-root", type: "section", style: { spacing: { paddingX: "lg", paddingY: "lg" } }, children: [
      { id: "fixture-heading", type: "heading", level: 2, text: "Fixture products" },
      { id: "fixture-card", type: "card", element: "article", style: { spacing: { paddingX: "md", paddingY: "md" }, border: { radius: "lg" } }, children: [
        { id: "fixture-text", type: "text", text: "One reusable card design" },
        { id: "fixture-image", type: "image", src: "/visual-builder/placeholder.svg", alt: "Fixture product", style: { custom: { width: "180px", height: "100px" } } },
      ] },
    ] },
  };
  const first = {
    id: "111111111111111111111111", name: "Inventory", slug: "inventory", isAuthenticated: true,
    isAuthorized: true, authorizeRole: ["admin"], variables: [{ id: "search", key: "search", type: "string", initialValue: "preserve-me" }],
    sections: [
      { id: "existing", type: "component", order: 0, component: { id: "existing-text", type: "text", props: { text: "Existing application content" } } },
      { id: "visual-section", type: "component", order: 1, component: { id: "fixture-visual", type: "custom", title: "Inventory visual", props: { visualBuilder: { document } } } },
    ],
  };
  page.__visualFixture = { pages: [], library: [], libraryReadDelay: 0, libraryWriteStatus: 200, requests: [], saves: [], readStatus: 200, writeStatus: 200, refreshStatus: 200, saveDelay: 0 };
  await page.routeWebSocket("**/*", socket => {
    const url = new URL(socket.url());
    if (url.hostname === "127.0.0.1" && ["3015", "3016"].includes(url.port)) socket.connectToServer();
    else socket.close();
  });
  await page.route("**/*", async route => {
    const request = route.request(); const url = new URL(request.url());
    const fixture = page.__visualFixture;
    if (!url.pathname.includes("/api/v1/")) {
      if (url.hostname === "127.0.0.1" && ["3015", "3016"].includes(url.port)) return route.continue();
      return route.abort();
    }
    fixture.requests.push({ method: request.method(), path: url.pathname });
    const reply = (data, status = 200) => route.fulfill({ status, contentType: "application/json", headers: { "access-control-allow-origin": request.headers()["origin"] || "http://127.0.0.1:3016", "access-control-allow-credentials": "true", "access-control-allow-headers": "content-type", "access-control-allow-methods": "GET,POST,PATCH,OPTIONS" }, body: JSON.stringify(data) });
    if (request.method() === "OPTIONS") return reply({});
    if (url.pathname.endsWith("/tenant-auth/refresh")) return reply({}, fixture.refreshStatus);
    if (url.pathname.includes("/admin/visual-components")) {
      if (request.method() === "GET") {
        if (fixture.libraryReadDelay) await new Promise(resolve => setTimeout(resolve, fixture.libraryReadDelay));
        return reply(fixture.library);
      }
      if (fixture.libraryWriteStatus !== 200) return reply({ message: "Fixture save rejected" }, fixture.libraryWriteStatus);
      const input = request.postDataJSON();
      if (request.method() === "POST") {
        const record = { ...input, id: String(fixture.library.length + 1).padStart(24, "3"), revision: 1 };
        fixture.library.push(record); return reply(record, 201);
      }
      const id = url.pathname.split("/").at(-1);
      const previous = fixture.library.find(design => design.id === id);
      if (!previous || previous.revision !== input.revision) return reply({ message: "Revision conflict" }, 409);
      const record = { ...input, id, revision: previous.revision + 1 };
      fixture.library = fixture.library.map(design => design.id === id ? record : design); return reply(record);
    }
    if (url.pathname.includes("/admin/page")) {
      if (request.method() === "PATCH") {
        if (fixture.saveDelay) await new Promise(resolve => setTimeout(resolve, fixture.saveDelay));
        if (fixture.writeStatus !== 200) return reply({ message: "Fixture write rejection" }, fixture.writeStatus);
        const payload = request.postDataJSON(); const id = url.pathname.split("/").at(-1);
        fixture.saves.push(payload); fixture.pages = fixture.pages.map(page => page.id === id ? { ...payload, id } : page);
        return reply({ data: { data: { matchedCount: 1 } } });
      }
      if (fixture.readStatus !== 200) return reply({ message: "Fixture read rejection" }, fixture.readStatus);
      if (/\/admin\/page\/?$/.test(url.pathname)) return reply(fixture.pages);
      const found = fixture.pages.find(page => page.id === url.pathname.split("/").at(-1));
      return found ? reply({ data: { data: found } }) : reply({}, 404);
    }
    if (url.pathname.endsWith("/auth/session")) return reply({ authenticated: true, user: { id: "fixture-user", role: "admin" } });
    if (url.pathname.endsWith("/page")) return reply(fixture.pages);
    if (url.pathname.includes("branding")) return reply({});
    return reply([]);
  });
  await page.addInitScript(() => {
    localStorage.setItem("project:fixture:inventory:loggedIn", "true");
    localStorage.setItem("project:fixture:inventory:user", JSON.stringify({ id: "fixture-user", role: "admin", roles: ["admin"] }));
    localStorage.setItem("user", JSON.stringify({ id: "fixture-user", email: "fixture@example.test", role: "admin", roles: ["project_developer"], roleScope: "project", tenantSlug: "fixture", projectSlug: "inventory", projectId: "fixture-project" }));
    localStorage.setItem("currentTenant", JSON.stringify({ id: "fixture-tenant", name: "Fixture", slug: "fixture" }));
    localStorage.setItem("currentProject", JSON.stringify({ id: "fixture-project", tenantId: "fixture-tenant", tenantSlug: "fixture", name: "Inventory", slug: "inventory" }));
  });
  await page.goto("http://127.0.0.1:3016/pages/visual-builder");
}
