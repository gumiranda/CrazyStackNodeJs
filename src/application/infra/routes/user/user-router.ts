import { userPostSchema } from "./userSchema";
import { userHandler } from "./userHandler";
async function user(fastify: any, options: any) {
  fastify.post("/user", userPostSchema, userHandler(fastify));
}
export { user };
