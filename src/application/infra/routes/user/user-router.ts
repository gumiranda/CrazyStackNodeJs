import { userPostSchema } from "./userSchema";
import { userHandler } from "./userHandler";
async function user(fastify: any, options: any) {
  fastify.addHook("preHandler", (request: any, reply: any, done: any) => {
    done();
  });
  fastify.post("/user", userPostSchema, userHandler(fastify));
}
export { user };
