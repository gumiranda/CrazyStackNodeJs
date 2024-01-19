import { signupAdapter, loginAdapter, signupOwnerAdapter } from "./authAdapter";
import { signupPostSchema, loginPostSchema } from "./authSchema";
import { WebSocketAdapter } from "@/application/infra/messaging";
import { makeAuthMiddleware } from "@/application/infra/middlewares";

async function auth(fastify: any, options: any) {
  const webSocketAdapter = new WebSocketAdapter(
    fastify,
    makeAuthMiddleware(["client", "owner", "admin", "professional"])
  );
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
  fastify.post("/auth/signupOwner", signupPostSchema, signupOwnerAdapter());
  fastify.post("/auth/login", loginPostSchema, loginAdapter());
  fastify.get(
    "/socket",
    { websocket: true },
    webSocketAdapter.handleConnection.bind(webSocketAdapter)
  );
}
export { auth };
