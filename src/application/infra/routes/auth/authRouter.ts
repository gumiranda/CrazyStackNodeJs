/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebSocketAdapter } from "@/application/infra/messaging";
import { signupAdapter, loginAdapter } from "./authAdapter";
import { signupPostSchema, loginPostSchema } from "./authSchema";
import { makeAuthMiddleware } from "@/application/infra/middlewares";

async function auth(fastify: any, options: any) {
  const webSocketAdapter = new WebSocketAdapter(
    fastify,
    makeAuthMiddleware(["client", "owner"])
  );
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
  fastify.post("/auth/login", loginPostSchema, loginAdapter());
  fastify.get(
    "/socket",
    { websocket: true },
    webSocketAdapter.handleConnection.bind(webSocketAdapter)
  );
}
export { auth };
