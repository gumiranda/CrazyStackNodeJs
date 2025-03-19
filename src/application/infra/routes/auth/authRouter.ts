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
import { WebSocketAdapter } from "@/application/infra/messaging";
import { makeAuthMiddleware } from "@/application/infra/middlewares";

async function auth(fastify: any, options: any) {
  const webSocketAdapter = new WebSocketAdapter(
    fastify,
    makeAuthMiddleware(["client", "owner", "admin", "professional"])
  );
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
  fastify.post("/auth/verify-email", verifyEmailSchema, verifyEmailAdapter());
  fastify.post("/auth/resend-email", resendEmailSchema, resendVerificationAdapter());
  fastify.post("/auth/login", loginPostSchema, loginAdapter());
  fastify.get(
    "/socket",
    { websocket: true },
    webSocketAdapter.handleConnection.bind(webSocketAdapter)
  );
}
export { auth };
