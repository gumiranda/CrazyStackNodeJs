import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import cors from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { rateLimit } from "elysia-rate-limit";
import { env, MongoHelper } from "@/application/infra";
import { routes } from "@/application/infra/routes";
import { closePool } from "./application/infra/database/postgres";
import { existsSync } from "fs";
import { join } from "path";

let isShuttingDown = false;

export const makeElysiaInstance = async (externalMongoClient: any) => {
  try {
    const client = externalMongoClient ?? (await MongoHelper.connect(env.mongoUri));

    const app = new Elysia()
      .use(
        cors({
          origin: (request) => {
            if (env.environment !== "production") return true;
            const origin = request.headers.get("origin") ?? "";
            const allowed = (process.env.ALLOWED_ORIGINS ?? "").split(",").filter(Boolean);
            return allowed.includes(origin);
          },
          methods: ["POST", "GET", "PATCH", "DELETE"],
          allowedHeaders: [
            "Content-Type",
            "Authorization",
            "authorization",
            "refreshtoken",
          ],
        })
      )
      .use(
        swagger({
          documentation: {
            info: {
              title: "CrazyStack Node.js",
              description: "Barberix API powered by Elysia",
              version: "0.1.0",
            },
            components: {
              securitySchemes: {
                bearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
            },
          },
        })
      )
      .use(rateLimit({ max: 1000, duration: 600_000 }))
      .onBeforeHandle(({ set }) => {
        if (isShuttingDown) {
          set.status = 503;
          return { error: "Server shutting down" };
        }
      })
      .onAfterHandle(({ set }) => {
        set.headers["X-Content-Type-Options"] = "nosniff";
        set.headers["X-Frame-Options"] = "DENY";
        set.headers["Strict-Transport-Security"] = "max-age=15552000";
        set.headers["Referrer-Policy"] = "no-referrer";
      })
      .onAfterResponse(({ request, set }) => {
        console.log(
          JSON.stringify({
            method: request.method,
            url: request.url,
            status: set.status,
            timestamp: new Date().toISOString(),
          })
        );
      });

    const api = new Elysia({ prefix: "/api" });
    for (const route of routes) {
      api.use(route);
    }
    app.use(api);

    // Serve admin SPA static files in production
    const adminDistPath = join(import.meta.dir, "..", "admin", "dist");
    if (existsSync(adminDistPath)) {
      app.use(staticPlugin({ assets: adminDistPath, prefix: "/" }));
      // SPA fallback: serve index.html for non-API, non-file routes
      app.get("/*", async () => {
        return Bun.file(join(adminDistPath, "index.html"));
      });
    }

    return { app, client };
  } catch (error) {
    await closePool();
    console.error(error);
    process.exit(1);
  }
};

const start = async () => {
  try {
    const result = await makeElysiaInstance(
      env.database !== "mongodb" ? {} : null
    );
    if (!result) return;
    const { app } = result;

    const port = env?.port ?? 3000;
    app.listen(port, () => {
      console.log(`O pai ta on na porta ${port}`);
    });

    const shutdown = async () => {
      console.log("Draining...");
      isShuttingDown = true;
      await new Promise((r) => setTimeout(r, 10_000));
      await app.stop();
      await MongoHelper.disconnect();
      await closePool();
      console.log("O pai ta off");
      process.exit(0);
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (err) {
    console.error(err);
    await closePool();
    process.exit(1);
  }
};

if (env.environment !== "test") {
  start();
}
