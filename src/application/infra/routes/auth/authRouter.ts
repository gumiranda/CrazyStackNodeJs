import { signupAdapter, loginAdapter } from "./authAdapter";
import { signupPostSchema, loginPostSchema } from "./authSchema";

async function auth(fastify: any, options: any) {
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
  fastify.post("/auth/login", loginPostSchema, loginAdapter());
}
export { auth };
