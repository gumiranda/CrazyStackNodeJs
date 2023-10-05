/* eslint-disable @typescript-eslint/no-var-requires */
import "./application/infra/config/module-alias";
import {
  env,
  routes,
  MongoHelper,
} from "@/application/infra";
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";
import { consumeMessageKafka } from "./application/infra/messaging/adapters/kafkaAdapter";
import { makeUpdateRouteDriverController } from "./slices/routeDriver/controllers";
import { HttpRequest } from "./application/helpers";
import { makeUpdateRouteDriverFactory } from "./slices/routeDriver/useCases";
const {
  fastifyRequestContextPlugin,
} = require("@fastify/request-context");
const GracefulServer = require("@gquittet/graceful-server");

export const makeFastifyInstance = async (
  externalMongoClient = null
) => {
  const fastify: FastifyInstance = Fastify({ logger: true });

  try {
    const client =
      externalMongoClient ??
      (await MongoHelper.connect(env.mongoUri));
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
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "authorization",
        "refreshtoken",
      ],
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
    const kafkaConsumers = [
      {
        topic: "updatePosition",
        callback: async (message: string) => {
          const parsedMessage = parseJSON(message);
          if (!parsedMessage) {
            return;
          }
          const {
            userId,
            routeDriverId,
            lat,
            lng,
            route_id,
          } = parsedMessage || {};
          const controller =
            makeUpdateRouteDriverController();
          const httpRequest: HttpRequest = {
            body: { updatedAt: new Date() },
            params: {},
            headers: {},
            userId: userId,
            query: {
              _id: routeDriverId,
              lat,
              lng,
              routeId: route_id,
            },
            userLogged: {},
          };
          const { statusCode, data } =
            await controller.handle(httpRequest);
          console.log({
            statusCode,
            m: "Received message:",
            parsedMessage,
          });
        },
      },
      {
        topic: "routeDriverFinished",
        callback: async (message: string) => {
          const parsedMessage = parseJSON(message);
          if (!parsedMessage) {
            return;
          }
          const {
            routeDriverId,
            routeId,
            newStatus,
            currentStatus,
            userId,
          } = parsedMessage || {};
          const updateRouteDriver =
            makeUpdateRouteDriverFactory();
          const updatedRouteDriver = await updateRouteDriver(
            {
              fields: {
                _id: routeDriverId,
                routeId,
              },
              options: {},
            },
            {
              status: newStatus,
            } as any
          );
          console.log({
            updatedRouteDriver,
            routeDriverId,
            routeId,
            newStatus,
            currentStatus,
            userId,
            m: "Received message:",
            parsedMessage,
          });
        },
      },
    ];
    const gracefulServer = GracefulServer(
      fastifyInstance.server
    );
    gracefulServer.on(GracefulServer.READY, () => {
      console.log("Server is ready");
    });

    gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
      kafkaAdapter.disconnectConsumer().then(() => {
        console.log("desconectou do kafka");
      });
      console.log("Server is shutting down");
    });

    gracefulServer.on(
      GracefulServer.SHUTDOWN,
      (error: any) => {
        console.log(
          "Server is down because of",
          error.message
        );
      }
    );
    const port: any = env?.port ?? 3000;
    await fastifyInstance.listen({ port, host: "0.0.0.0" });
    fastifyInstance.log.info(`server listening on ${port}`);
    gracefulServer.setReady();
    kafkaAdapter = await consumeMessageKafka({
      consumers: kafkaConsumers,
    });
  } catch (err) {
    process.exit(1);
  }
};
if (env.environment === "production") {
  start();
}
export const parseJSON = (json: any): any => {
  try {
    const parsedJson = JSON.parse(json);
    return parsedJson;
  } catch (e) {
    return null;
  }
};
