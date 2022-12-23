import { signupAdapter } from "./authAdapter";
import { signupPostSchema } from "./authSchema";

async function auth(fastify: any, options: any) {
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
}
export { auth };
