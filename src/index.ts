/* eslint-disable @typescript-eslint/no-var-requires */
import "./application/infra/config/module-alias";
import { env, routes, MongoHelper } from "@/application/infra";
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
const { fastifyRequestContextPlugin } = require("@fastify/request-context");
import GracefulServer from "@gquittet/graceful-server";
import { closePool } from "./application/infra/database/postgres";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

export const makeFastifyInstance = async (externalMongoClient: any) => {
  const fastify: FastifyInstance = Fastify({ logger: true });
  try {
    const client = externalMongoClient ?? (await MongoHelper.connect(env.mongoUri));
    await fastify.register(require("@fastify/multipart"), {
      limits: {
        fieldNameSize: 250,
        fieldSize: 1000000,
        fields: 10,
        fileSize: 1000000,
        files: 1,
        headerPairs: 2000,
        parts: 1000,
      },
    });
    await fastify.register(require("@fastify/helmet"), {
      contentSecurityPolicy: false,
      global: true,
    });
    await fastify.register(import("@fastify/rate-limit"), {
      max: 1000,
      timeWindow: "10 minutes",
      global: true,
    });
    await fastify.register(cors, {
      origin: env.environment === "production"
        ? (process.env.ALLOWED_ORIGINS ?? "").split(",").filter(Boolean)
        : "*",
      methods: ["POST", "GET", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "authorization", "refreshtoken"],
    });
    if (env.environment === "production") {
      await fastify.register(require("@fastify/under-pressure"), {
        maxEventLoopDelay: 1000,
        maxHeapUsedBytes: 100000000,
        maxRssBytes: 100000000,
        maxEventLoopUtilization: 0.98,
        message: "Server under pressure, try again later",
        retryAfter: 50,
      });
    }
    await fastify.register(fastifyRequestContextPlugin, {
      hook: "onRequest",
      defaultStoreValues: {
        user: { insertedId: "system" },
      },
    });
    await fastify.register(require("@fastify/mongodb"), {
      forceClose: true,
      client,
    });
    fastify.register(fastifySwagger, {
      openapi: {
        openapi: "3.0.0",
        info: {
          title: "CrazyStack Node.js",
          description: "Testing the Fastify swagger API",
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
    });

    fastify.register(fastifySwaggerUI, {
      routePrefix: "/docs",
    });
    for (const route of routes) {
      fastify.register(route, { prefix: "/api" });
    }
    return fastify;
  } catch (error) {
    await closePool();
    fastify.log.error(error);
    process.exit(1);
  }
};
// Run the server!
const start = async () => {
  try {
    const fastifyInstance = await makeFastifyInstance(
      env.database !== "mongodb" ? {} : null
    );
    if (!fastifyInstance) return;
    const gracefulServer = GracefulServer(fastifyInstance.server);
    gracefulServer.on(GracefulServer.READY, () => {
      console.log("O pai ta on");
    });
    gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
      closePool().then(() => {
        console.log("desconectou do banco");
      });
      console.log("O pai ta ficando off");
    });
    gracefulServer.on(GracefulServer.SHUTDOWN, (error: any) => {
      console.log("O pai ta off porque", error.message);
    });
    const port: any = env?.port ?? 3000;
    await fastifyInstance.listen({ port, host: "0.0.0.0" });
    fastifyInstance.log.info(`server listening on ${port}`);
    gracefulServer.setReady();
    fastifyInstance.swagger();
  } catch (err) {
    await closePool();
    process.exit(1);
  }
};
if (env.environment === "production") {
  start();
}
