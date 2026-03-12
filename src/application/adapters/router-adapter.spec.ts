import { adaptRoute } from "./router-adapter";

jest.mock("@fastify/request-context", () => ({
  requestContext: {
    get: jest.fn().mockReturnValue({
      userId: "any_user_id",
      userLogged: { _id: "any_user_id", role: "client" },
      daysToNextPayment: 30,
    }),
  },
}));

describe("adaptRoute", () => {
  let controller: any;
  let request: any;
  let reply: any;

  beforeEach(() => {
    controller = {
      handle: jest.fn().mockResolvedValue({ statusCode: 200, data: { success: true } }),
    };
    request = {
      body: { name: "any_name" },
      params: { id: "any_id" },
      query: { page: 1 },
      headers: { authorization: "Bearer token" },
    };
    reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should call controller.handle with correct httpRequest", async () => {
    const handler = adaptRoute(controller);
    await handler(request, reply);
    expect(controller.handle).toHaveBeenCalledWith({
      body: { name: "any_name" },
      params: { id: "any_id" },
      headers: { authorization: "Bearer token" },
      userId: "any_user_id",
      query: { page: 1 },
      userLogged: { _id: "any_user_id", role: "client" },
      daysToNextPayment: 30,
    });
  });

  it("should reply with correct statusCode and data", async () => {
    const handler = adaptRoute(controller);
    await handler(request, reply);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({ success: true });
  });

  it("should return a function", () => {
    const handler = adaptRoute(controller);
    expect(typeof handler).toBe("function");
  });
});

describe("adaptRoute with no context", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should use null defaults when requestContext returns null", async () => {
    jest.doMock("@fastify/request-context", () => ({
      requestContext: { get: jest.fn().mockReturnValue(null) },
    }));
    const { adaptRoute: adaptRouteNoCtx } = require("./router-adapter");
    const controller = {
      handle: jest.fn().mockResolvedValue({ statusCode: 200, data: {} }),
    };
    const request = { body: {}, params: {}, query: {}, headers: {} };
    const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };
    const handler = adaptRouteNoCtx(controller);
    await handler(request, reply);
    expect(controller.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: null,
        userLogged: null,
        daysToNextPayment: null,
      })
    );
  });
});
