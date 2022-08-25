import "./application/infra/config/module-alias";
import { env } from "@/application/infra";
import Fastify, { FastifyInstance } from "fastify";

const fastify: FastifyInstance = Fastify({ logger: true });
// Declare a route
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

// Run the server!
const start = async () => {
  try {
    const port: any = env?.port ?? 3000;
    await fastify.listen({ port });
    fastify.log.info(`server listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
