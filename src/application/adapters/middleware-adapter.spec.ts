import { adaptMiddleware } from "./middleware-adapter";
import { ServerError } from "@/application/errors";

describe("adaptMiddleware", () => {
  let middleware: any;
  let request: any;
  let reply: any;

  beforeEach(() => {
    middleware = {
      handle: jest.fn().mockResolvedValue({
        statusCode: 200,
        data: { userId: "any_id", userLogged: {} },
      }),
    };
    request = {
      headers: { authorization: "Bearer any_token" },
      requestContext: { set: jest.fn() },
    };
    reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should call middleware.handle with headers", async () => {
    const handler = adaptMiddleware(middleware);
    await handler(request, reply);
    expect(middleware.handle).toHaveBeenCalledWith({
      headers: { authorization: "Bearer any_token" },
    });
  });

  it("should set request context on success (statusCode 200)", async () => {
    const handler = adaptMiddleware(middleware);
    await handler(request, reply);
    expect(request.requestContext.set).toHaveBeenCalledWith("context", {
      userId: "any_id",
      userLogged: {},
    });
  });

  it("should reply with error when statusCode is not 200 and data exists", async () => {
    middleware.handle.mockResolvedValueOnce({
      statusCode: 403,
      data: { message: "Forbidden" },
    });
    const handler = adaptMiddleware(middleware);
    await handler(request, reply);
    expect(reply.code).toHaveBeenCalledWith(403);
    expect(reply.send).toHaveBeenCalledWith({ message: "Forbidden" });
  });

  it("should reply with 500 ServerError when statusCode is not 200 and no data", async () => {
    middleware.handle.mockResolvedValueOnce({
      statusCode: 401,
      data: null,
    });
    const handler = adaptMiddleware(middleware);
    await handler(request, reply);
    expect(reply.code).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith(expect.any(ServerError));
  });

  it("should return a function", () => {
    const handler = adaptMiddleware(middleware);
    expect(typeof handler).toBe("function");
  });
});
