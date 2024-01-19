/* eslint-disable @typescript-eslint/no-var-requires */
import "./application/infra/config/module-alias";
import { env, routes, MongoHelper } from "@/application/infra";
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";
const { fastifyRequestContextPlugin } = require("@fastify/request-context");
import { consumeMessageKafka } from "./application/infra/messaging/adapters/kafkaAdapter";
import GracefulServer from "@gquittet/graceful-server";
import {
  routeDriverFinishedConsumer,
  updatePositionConsumer,
} from "./application/infra/messaging/consumers";

export const makeFastifyInstance = async (externalMongoClient = null) => {
  const fastify: FastifyInstance = Fastify({ logger: true });
  try {
    const client = externalMongoClient ?? (await MongoHelper.connect(env.mongoUri));
    await fastify.register(require("@fastify/helmet"), {
      contentSecurityPolicy: false,
      global: true,
    });
    await fastify.register(import("@fastify/rate-limit"), {
      max: 1000,
      timeWindow: "10 minutes",
    });
    await fastify.register(cors, {
      origin: "*",
      methods: ["POST", "GET", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "authorization", "refreshtoken"],
    });
    await fastify.register(websocket);

    if (env.environment === "production") {
      // await fastify.register(require("@fastify/under-pressure"), {
      //   maxEventLoopDelay: 1000,
      //   maxHeapUsedBytes: 100000000,
      //   maxRssBytes: 100000000,
      //   maxEventLoopUtilization: 0.98,
      //   message: "Estamos sobrecarregados!",
      //   retryAfter: 50,
      // });
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
    for (const route of routes) {
      fastify.register(route, { prefix: "/api" });
    }
    return fastify;
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
let kafkaAdapter: any;
// Run the server!
const start = async () => {
  try {
    const fastifyInstance = await makeFastifyInstance();
    if (!fastifyInstance) return;
    const kafkaConsumers = [updatePositionConsumer, routeDriverFinishedConsumer];
    const gracefulServer = GracefulServer(fastifyInstance.server);
    gracefulServer.on(GracefulServer.READY, () => {
      console.log("O pai ta on");
    });
    gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
      kafkaAdapter.disconnectConsumer().then(() => {
        console.log("desconectou kafka consumer");
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
    kafkaAdapter = await consumeMessageKafka({ consumers: kafkaConsumers });
  } catch (err) {
    process.exit(1);
  }
};
if (env.environment === "production") {
  start();
}
