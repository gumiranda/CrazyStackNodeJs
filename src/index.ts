import "./application/infra/config/module-alias";
import { env, routes } from "@/application/infra";
import Fastify, { FastifyInstance } from "fastify";
const fastify: FastifyInstance = Fastify({ logger: true });

// Run the server!
const start = async () => {
  try {
    await fastify.register(require("@fastify/mongodb"), {
      // force to close the mongodb connection when app stopped
      // the default value is false
      forceClose: true,
      url: env.mongoUri,
    });
    for (const route of routes) {
      fastify.register(route);
    }
    const port: any = env?.port ?? 3000;
    await fastify.listen({ port, host: "0.0.0.0" });
    fastify.log.info(`server listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
