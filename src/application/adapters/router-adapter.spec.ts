import { describe, it, expect, beforeEach, jest } from "bun:test";
import { adaptRoute } from "./router-adapter";

describe("adaptRoute", () => {
  let controller: any;
  let context: any;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = {
      handle: jest.fn().mockResolvedValue({ statusCode: 200, data: { success: true } }),
    };
    context = {
      body: { name: "any_name" },
      params: { id: "any_id" },
      query: { page: 1 },
      headers: { authorization: "Bearer token" },
      set: { status: 0 },
      store: {
        userId: "any_user_id",
        userLogged: { _id: "any_user_id", role: "client" },
        daysToNextPayment: 30,
      },
    };
  });

  it("should call controller.handle with correct httpRequest", async () => {
    const handler = adaptRoute(controller);
    await handler(context);
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

  it("should set status and return data", async () => {
    const handler = adaptRoute(controller);
    const result = await handler(context);
    expect(context.set.status).toBe(200);
    expect(result).toEqual({ success: true });
  });

  it("should return a function", () => {
    const handler = adaptRoute(controller);
    expect(typeof handler).toBe("function");
  });

  it("should use null defaults when store is empty", async () => {
    context.store = {};
    const handler = adaptRoute(controller);
    await handler(context);
    expect(controller.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: null,
        userLogged: null,
        daysToNextPayment: null,
      })
    );
  });
});
