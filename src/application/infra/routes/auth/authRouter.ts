/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest } from "fastify";
import { signupAdapter, loginAdapter } from "./authAdapter";
import { signupPostSchema, loginPostSchema } from "./authSchema";

class WebSocketAdapter {
  private fastify: any;
  constructor(fastify: any) {
    this.fastify = fastify;
  }

  handleConnection(connection: any, req: FastifyRequest) {
    connection.socket.on("message", async (message: any) => {
      try {
        const payload = this.parseMessage(message);
        if (payload.action === "auth") {
          this.handleAuthentication(payload, connection);
        } else {
          this.handlePayload(payload, connection);
        }
      } catch (error) {
        this.handleError(error, connection);
      }
    });
  }
  private parseMessage(message: any) {
    return JSON.parse(message.toString());
  }

  private handlePayload(payload: any, connection: any) {
    if (this.isValidPayload(payload, connection)) {
      this.broadcast(payload);
      connection.socket.send("Message processed successfully");
    } else {
      connection.socket.send("Invalid payload");
    }
  }

  private handleError(error: any, connection: any) {
    console.error("Error processing message:", error);
    connection.socket.send("Error processing message");
  }
  private handleAuthentication(payload: any, connection: any) {
    const tokenIsValid = this.verifyToken(payload.token);

    if (tokenIsValid) {
      const userId = payload?._id;
      if (userId) {
        connection.socket._id = userId;
      }
      connection.socket.authenticated = true;
      connection.socket.send("Authentication successful");
    } else {
      connection.socket.send("Invalid token");
    }
  }

  private verifyToken(token: string): boolean {
    // Add your token verification logic here
    return true;
  }

  private isValidPayload(payload: any, connection: any): boolean {
    return (
      connection.socket.authenticated && payload.route_id && payload.lat && payload.lng
    );
  }

  private broadcast(message: any) {
    for (const client of this.fastify.websocketServer.clients) {
      console.log({ clientId: client?._id });
      if (client?._id) {
        client.send(JSON.stringify(message));
      }
    }
  }
}
async function auth(fastify: any, options: any) {
  const webSocketAdapter = new WebSocketAdapter(fastify);
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
  fastify.post("/auth/login", loginPostSchema, loginAdapter());
  fastify.get(
    "/chat",
    { websocket: true },
    webSocketAdapter.handleConnection.bind(webSocketAdapter)
  );
}
export { auth };
