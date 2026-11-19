// A disposable browser-test server. Production controllers, routes, authorization,
// session repositories and the invitation delivery worker are used without stubs.
package main

import (
	"context"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/osmansam/autotableGo/configs"
	"github.com/osmansam/autotableGo/models"
	"github.com/osmansam/autotableGo/repositories"
	"github.com/osmansam/autotableGo/routes"
	"github.com/osmansam/autotableGo/services"
	"github.com/osmansam/autotableGo/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"log"
	"os"
	"os/signal"
	"strings"
	"sync"
	"syscall"
	"time"
)

type mailbox struct {
	sync.Mutex
	messages []models.InvitationMessage
}

func (m *mailbox) Send(_ context.Context, message models.InvitationMessage) error {
	m.Lock()
	defer m.Unlock()
	m.messages = append(m.messages, message)
	return nil
}
func must(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
func main() {
	// Never accept an application database name, even if a developer has a .env file.
	name := os.Getenv("COLLECTION_NAME")
	if !strings.HasPrefix(name, "tenant_panel_e2e_") || os.Getenv("E2E_FIXTURE_KEY") == "" {
		log.Fatal("Refusing to start outside a disposable e2e database")
	}
	cfg := configs.GetAppConfig()
	cfg.Redis.Host = "127.0.0.1"
	cfg.Redis.Port = os.Getenv("E2E_REDIS_PORT")
	cfg.Redis.Password = ""
	cfg.CorsWhitelist = []string{"http://127.0.0.1:4173"}
	configs.InitDB()
	db := configs.DB.Database(name)
	ctx := context.Background()
	defer db.Drop(ctx)
	mail := &mailbox{}
	app := fiber.New(fiber.Config{DisableStartupMessage: true})
	app.Use(cors.New(cors.Config{AllowOrigins: "http://127.0.0.1:4173", AllowCredentials: true, AllowHeaders: "Origin,Content-Type,Accept,Idempotency-Key"}))
	app.Get("/health", func(c *fiber.Ctx) error { return c.SendString("ok") })
	// Fixture controls are loopback-only and require a per-run random secret.
	app.Use("/__e2e", func(c *fiber.Ctx) error {
		if c.Get("X-E2E-Key") != os.Getenv("E2E_FIXTURE_KEY") {
			return c.SendStatus(403)
		}
		return c.Next()
	})
	app.Post("/__e2e/reset", func(c *fiber.Ctx) error {
		must(db.Drop(ctx))
		mail.Lock()
		mail.messages = nil
		mail.Unlock()
		tenant, owner, existing, member, project, second, inactive, page := primitive.NewObjectID(), primitive.NewObjectID(), primitive.NewObjectID(), primitive.NewObjectID(), primitive.NewObjectID(), primitive.NewObjectID(), primitive.NewObjectID(), primitive.NewObjectID()
		now := time.Now()
		hash, err := bcrypt.GenerateFromPassword([]byte("Smoke-password-123!"), bcrypt.MinCost)
		must(err)
		insert := func(collection string, doc interface{}) {
			_, err := db.Collection(collection).InsertOne(ctx, doc)
			must(err)
		}
		for _, user := range []struct {
			id          primitive.ObjectID
			email, name string
		}{{owner, "owner@example.test", "Smoke Owner"}, {existing, "existing@example.test", "Existing Account"}, {member, "member@example.test", "Smoke Member"}} {
			insert("users", bson.M{"_id": user.id, "email": user.email, "normalizedEmail": user.email, "name": user.name, "password": string(hash), "emailVerifiedAt": now, "isActive": true, "createdAt": now, "updatedAt": now})
			role := models.TenantRoleMember
			if user.id == owner {
				role = models.TenantRoleOwner
			}
			insert("tenant_memberships", models.TenantMembership{ID: primitive.NewObjectID(), UserID: user.id, TenantID: tenant, Roles: []string{role}, Status: models.MembershipStatusActive, CreatedAt: now, UpdatedAt: now})
		}
		insert("tenants", models.Tenant{ID: tenant, Name: "Smoke Tenant", Slug: "smoke", OwnerUserID: owner, IsActive: true, CreatedAt: now, UpdatedAt: now})
		for _, p := range []struct {
			id         primitive.ObjectID
			slug, name string
			active     bool
		}{{project, "inventory", "Inventory", true}, {second, "catalog", "Catalog", true}, {inactive, "archived", "Archived", false}} {
			insert("projects", models.Project{ID: p.id, TenantID: tenant, TenantSlug: "smoke", Slug: p.slug, Name: p.name, IsActive: p.active, CreatedAt: now, UpdatedAt: now})
			insert("project_memberships", models.ProjectMembership{ID: primitive.NewObjectID(), UserID: owner, TenantID: tenant, ProjectID: p.id, Roles: []string{models.ProjectRoleAdmin}, Status: models.MembershipStatusActive, Version: 1, CreatedAt: now, UpdatedAt: now})
		}
		insert("project_memberships", models.ProjectMembership{ID: primitive.NewObjectID(), UserID: member, TenantID: tenant, ProjectID: project, Roles: []string{models.ProjectRoleViewer}, Status: models.MembershipStatusActive, Version: 1, CreatedAt: now, UpdatedAt: now})
		insert("management_collaboration_migrations", bson.M{"_id": "schema", "ready": true, "version": 1})
		visualDocument := bson.M{"version": 2, "id": "smoke-document", "name": "Smoke Visual", "root": bson.M{"id": "root", "type": "section", "children": []bson.M{{"id": "heading", "type": "heading", "level": 2, "text": "Smoke visual content"}}}}
		sections := []models.Section{
			{Columns: 1, Cells: []models.GridCell{{ID: "smoke-cell", Row: 1, Column: 1, Components: []models.ComponentBlock{{ID: "smoke-text", Type: "text", Title: "Original title"}}}}},
			{ID: "smoke-visual-section", Type: models.SectionTypeComponent, Component: &models.ComponentBlock{ID: "smoke-visual", Type: "custom", Title: "Smoke Visual", Props: map[string]interface{}{"visualBuilder": bson.M{"document": visualDocument}}}},
		}
		_, err = utils.GetPageCollectionForProject(tenant.Hex(), project.Hex()).InsertOne(ctx, models.PageModel{ID: page, Name: "Smoke Page", Slug: "smoke-page", Sections: sections})
		must(err)
		must(repositories.EnsureCollaborationIndexes(ctx, db))
		must(repositories.NewAuthSessionRepository().EnsureIndexes(ctx))
		must(repositories.NewVisualComponentRepository().EnsureIndexes(ctx))
		// Redis belongs exclusively to this run; stale slug mappings must not cross seed generations.
		must(configs.RedisClient.FlushDB(ctx).Err())
		return c.JSON(fiber.Map{"tenantId": tenant.Hex(), "projectId": project.Hex(), "secondProjectId": second.Hex(), "inactiveProjectId": inactive.Hex(), "pageId": page.Hex(), "memberId": member.Hex()})
	})
	app.Get("/__e2e/mail", func(c *fiber.Ctx) error {
		config, keys, err := services.ValidateInvitationConfiguration()
		if err != nil {
			return c.Status(500).SendString(err.Error())
		}
		worker := services.NewInvitationDeliveryWorker(db, config, keys, mail)
		for i := 0; i < 20; i++ {
			found, err := worker.ProcessNext(ctx, "browser-smoke", time.Now())
			if err != nil {
				return c.Status(500).SendString(err.Error())
			}
			if !found {
				break
			}
		}
		mail.Lock()
		defer mail.Unlock()
		for i := len(mail.messages) - 1; i >= 0; i-- {
			if mail.messages[i].To == c.Query("email") {
				return c.JSON(mail.messages[i])
			}
		}
		return c.SendStatus(404)
	})
	routes.TenantAuthRoutes(app)
	routes.ProjectRoutes(app)
	routes.BrandingRoutes(app)
	routes.ContainerRoutes("api/v1/:tenantSlug/:projectSlug/container", app)
	routes.PageRoutes("api/v1/:tenantSlug/:projectSlug/page", app)
	routes.VisualComponentRoutes(app)
	routes.LocalizationRoutes(app)
	routes.IntegrationRoutes("api/v1/:tenantSlug/:projectSlug/integrations", app)
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	go func() { <-stop; _ = app.Shutdown() }()
	if err := app.Listen("127.0.0.1:4174"); err != nil {
		log.Print(err)
	}
}
