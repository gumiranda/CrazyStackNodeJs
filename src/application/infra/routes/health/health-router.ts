import { FastifyInstance } from "fastify";
async function health(fastify: FastifyInstance, options: any) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
}
export { health };
