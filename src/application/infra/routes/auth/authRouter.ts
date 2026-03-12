import {
  signupAdapter,
  loginAdapter,
  verifyEmailAdapter,
  resendVerificationAdapter,
} from "./authAdapter";
import {
  signupPostSchema,
  loginPostSchema,
  verifyEmailSchema,
  resendEmailSchema,
} from "./authSchema";

async function auth(fastify: any, options: any) {
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
  fastify.post("/auth/verify-email", verifyEmailSchema, verifyEmailAdapter());
  fastify.post("/auth/resend-email", resendEmailSchema, resendVerificationAdapter());
  fastify.post("/auth/login", loginPostSchema, loginAdapter());
}
export { auth };
