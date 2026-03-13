import { describe, it, expect, beforeEach, jest } from "bun:test";
import { adaptMiddleware } from "./middleware-adapter";

describe("adaptMiddleware", () => {
  let middleware: any;
  let context: any;

  beforeEach(() => {
    jest.clearAllMocks();
    middleware = {
      handle: jest.fn().mockResolvedValue({
        statusCode: 200,
        data: { userId: "any_id", userLogged: {}, daysToNextPayment: 30 },
      }),
    };
    context = {
      headers: { authorization: "Bearer any_token" },
      set: { status: 0 },
      store: {} as any,
    };
  });

  it("should call middleware.handle with headers", async () => {
    const handler = adaptMiddleware(middleware);
    await handler(context);
    expect(middleware.handle).toHaveBeenCalledWith({
      headers: { authorization: "Bearer any_token" },
    });
  });

  it("should set store values on success (statusCode 200)", async () => {
    const handler = adaptMiddleware(middleware);
    await handler(context);
    expect(context.store.userId).toBe("any_id");
    expect(context.store.userLogged).toEqual({});
    expect(context.store.daysToNextPayment).toBe(30);
  });

  it("should set status and return data when statusCode is not 200 and data exists", async () => {
    middleware.handle.mockResolvedValueOnce({
      statusCode: 403,
      data: { message: "Forbidden" },
    });
    const handler = adaptMiddleware(middleware);
    const result = await handler(context);
    expect(context.set.status).toBe(403);
    expect(result).toEqual({ message: "Forbidden" });
  });

  it("should return 500 error when statusCode is not 200 and no data", async () => {
    middleware.handle.mockResolvedValueOnce({
      statusCode: 401,
      data: null,
    });
    const handler = adaptMiddleware(middleware);
    const result = await handler(context);
    expect(context.set.status).toBe(500);
    expect(result).toEqual({ error: "Internal Server Error" });
  });

  it("should return a function", () => {
    const handler = adaptMiddleware(middleware);
    expect(typeof handler).toBe("function");
  });
});
