import { FastifyInstance } from "fastify";
import { Middleware } from "@/application/infra/contracts";
import { WebSocketProtocol } from "../protocols";

export class WebSocketAdapter implements WebSocketProtocol {
  private fastify: FastifyInstance;
  constructor(
    fastify: FastifyInstance,
    private readonly authMiddleware: Middleware
  ) {
    this.fastify = fastify;
  }
  handleConnection(connection: any): void {
    connection.socket.on("message", async (message: any) => {
      try {
        const payload = this.parseMessage(message);
        if (payload.action === "auth") {
          await this.handleAuthentication(payload, connection);
        } else {
          this.handlePayload(payload, connection);
        }
      } catch (error) {
        this.handleError(error, connection);
      }
    });
  }
  private parseMessage(message: any) {
    try {
      return JSON.parse(message.toString());
    } catch (error) {
      return null;
    }
  }
  private handleError(error: any, connection: any) {
    console.error("Error processing message", error);
    connection.socket.send("Error processing message");
  }
  private async handleAuthentication(payload: any, connection: any) {
    if (!payload?.token) {
      connection.socket.send("Token not found");
      return;
    }
    const { data = null } =
      (await this.authMiddleware.handle({
        headers: { authorization: payload?.token },
      })) || {};
    if (data?.userId) {
      connection.socket.userId = data?.userId;
      connection.socket.userLogged = data?.userLogged;
      connection.socket.authenticated = true;
      connection.socket.send("Authentication successfull");
      return;
    }
    connection.socket.send("Invalid Token");
  }
  private handlePayload(payload: any, connection: any) {
    if (this.isValidPayload(payload, connection)) {
      this.broadcast(payload);
      connection.socket.send("Message processed successfully");
      return;
    }
    connection.socket.send("Invalid payload");
  }
  private isValidPayload(payload: any, connection: any): boolean {
    return (
      connection.socket.authenticated && payload.route_id && payload.lat && payload.lng
    );
  }
  private broadcast(message: any) {
    for (const client of this.fastify.websocketServer.clients as any) {
      if (client?.userId) {
        client.send(JSON.stringify(message));
      }
    }
  }
}
