import { addUserPostSchema } from "./userSchema";
import { userHandler } from "./userHandler";
async function user(fastify: any, options: any) {
  fastify.addHook("preHandler", (request: any, reply: any, done: any) => {
    done();
  });
  fastify.post("/user", addUserPostSchema, userHandler(fastify));
}
export { user };
