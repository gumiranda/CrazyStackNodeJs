/* eslint-disable @typescript-eslint/no-var-requires */
import "./application/infra/config/module-alias";
import { env, routes, MongoHelper } from "@/application/infra";
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
const { fastifyRequestContextPlugin } = require("@fastify/request-context");
export const makeFastifyInstance = async (externalMongoClient = null) => {
  const fastify: FastifyInstance = Fastify({ logger: true });
  try {
    const client = externalMongoClient ?? (await MongoHelper.connect(env.mongoUri));
    await fastify.register(require("@fastify/helmet"), {
      contentSecurityPolicy: false,
      global: true,
    });
    await fastify.register(import("@fastify/rate-limit"), {
      max: 100,
      timeWindow: "10 minutes",
    });
    await fastify.register(cors, {
      origin: "*",
      methods: ["POST", "GET", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "authorization", "refreshtoken"],
    });
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
// Run the server!
const start = async () => {
  const fastifyInstance = await makeFastifyInstance();
  if (!fastifyInstance) return;
  const port: any = env?.port ?? 3000;
  await fastifyInstance.listen({ port, host: "0.0.0.0" });
  fastifyInstance.log.info(`server listening on ${port}`);
};
if (env.environment === "production") {
  start();
}
const a = [
  {
    $match: {
      professionalId: "63bc2ee4b339572dc498b3b1",
      initDate: { $lte: "2023-01-30T23:59:59-03:00", $gte: "2023-01-30T00:00:00-03:00" },
      endDate: { $lte: "2023-01-30T23:59:59-03:00", $gte: "2023-01-30T00:00:00-03:00" },
      cancelled: false,
      active: true,
    },
  },
  { $sort: { initDate: 1 } },
  {
    $lookup: {
      from: "user",
      localField: "professionalId",
      foreignField: "_id",
      as: "professionalDetails",
    },
  },
  { $project: { initDate: 1, endDate: 1, professionalDetails: { ownerId: 1 } } },
  { $unwind: { path: "$professionalDetails" } },
  {
    $lookup: {
      from: "owner",
      localField: "professionalDetails.ownerId",
      foreignField: "_id",
      as: "owner",
    },
  },
  {
    $project: {
      initDate: 1,
      endDate: 1,
      owner: {
        days1: 1,
        hourStart1: 1,
        hourEnd1: 1,
        hourLunchEnd1: 1,
        hourLunchStart1: 1,
        days2: 1,
        hourStart2: 1,
        hourEnd2: 1,
        hourLunchEnd2: 1,
        hourLunchStart2: 1,
        days3: 1,
        hourStart3: 1,
        hourEnd3: 1,
        hourLunchEnd3: 1,
        hourLunchStart3: 1,
      },
    },
  },
  { $unwind: { path: "$owner" } },
  { $group: { _id: "$owner", data: { $push: "$$ROOT" } } },
  { $project: { _id: 1, data: { initDate: 1, endDate: 1 } } },
];
