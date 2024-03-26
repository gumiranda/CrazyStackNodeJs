import { WebSocketAdapter } from "./webSocketAdapter";
import { FastifyInstance } from "fastify";
import { Middleware } from "@/application/infra/contracts";
import { mock, MockProxy } from "jest-mock-extended";

jest.mock("./kafkaAdapter", () => ({
  sendMessageKafka: jest.fn(),
}));
describe("WebSocket Adapter tests", () => {
  let webSocketAdapter: WebSocketAdapter;
  let fastifyMock: MockProxy<FastifyInstance> & FastifyInstance;
  let authMiddlewareMock: MockProxy<Middleware> & Middleware;
  let connectionMock: any;

  beforeEach(() => {
    fastifyMock = mock<FastifyInstance>();
    authMiddlewareMock = mock<Middleware>();
    connectionMock = {
      socket: {
        on: jest.fn(),
        send: jest.fn(),
        userId: null,
        userLogged: null,
        authenticated: false,
      },
    };
    webSocketAdapter = new WebSocketAdapter(fastifyMock, authMiddlewareMock);
  });

  test("handleConnection sets up message event listener", () => {
    webSocketAdapter.handleConnection(connectionMock);
    expect(connectionMock.socket.on).toHaveBeenCalledWith("message", expect.any(Function));
  });

  test("handleAuthentication sends error message if no token", async () => {
    await (webSocketAdapter as any).handleAuthentication({}, connectionMock);
    expect(connectionMock.socket.send).toHaveBeenCalledWith("Token not found");
  });

  test("handleAuthentication sends error message if invalid token", async () => {
    authMiddlewareMock.handle.mockResolvedValueOnce(null as any);
    await (webSocketAdapter as any).handleAuthentication(
      { token: "invalid" },
      connectionMock
    );
    expect(connectionMock.socket.send).toHaveBeenCalledWith("Invalid Token");
  });

  test("handleAuthentication sets user data and sends success message if valid token", async () => {
    authMiddlewareMock.handle.mockResolvedValueOnce({
      data: { userId: "userId", userLogged: true },
    } as any);
    await (webSocketAdapter as any).handleAuthentication(
      { token: "valid" },
      connectionMock
    );
    expect(connectionMock.socket.userId).toBe("userId");
    expect(connectionMock.socket.userLogged).toBe(true);
    expect(connectionMock.socket.authenticated).toBe(true);
    expect(connectionMock.socket.send).toHaveBeenCalledWith("Authentication successfull");
  });

  test("handlePayload sends error message if invalid payload", () => {
    (webSocketAdapter as any).handlePayload({}, connectionMock);
    expect(connectionMock.socket.send).toHaveBeenCalledWith("Invalid payload");
  });

  // test("handlePayload broadcasts message, sends to Kafka, and sends success message if valid payload", () => {
  //   connectionMock.socket.authenticated = true;
  //   const payload = { route_id: "routeId", lat: "lat", lng: "lng", topic: "topic" };
  //   (webSocketAdapter as any).handlePayload(payload, connectionMock);
  //   expect(sendMessageKafka).toHaveBeenCalledWith({
  //     topic: payload.topic,
  //     message: JSON.stringify({ ...payload, userId: connectionMock.socket.userId }),
  //   });
  //   expect(connectionMock.socket.send).toHaveBeenCalledWith(
  //     "Message processed successfully"
  //   );
  // });
});
