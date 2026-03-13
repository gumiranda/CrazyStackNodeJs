import { describe, it, expect, beforeEach, jest, mock } from "bun:test";
mock.module("@/application/helpers/date/date", () => ({}));
mock.module("@/application/helpers/date/index", () => ({}));

import { HttpRequest, HttpResponse, serverError } from "@/application/helpers/http/http";
import { Controller } from "./controller";

class ControllerStub extends Controller {
  result: HttpResponse = { statusCode: 200, data: { success: true } };
  override async execute(_httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.result;
  }
}

class ControllerSyncErrorStub extends Controller {
  override execute(_httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error("sync_error");
  }
}

class ControllerAsyncErrorStub extends Controller {
  override async execute(_httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error("async_error");
  }
}

describe("Controller", () => {
  let sut: ControllerStub;
  beforeEach(() => {
    jest.clearAllMocks();
    sut = new ControllerStub();
  });

  it("should return execute result on success", async () => {
    const result = await sut.handle({ body: {} });
    expect(result).toEqual({ statusCode: 200, data: { success: true } });
  });

  it("should pass httpRequest to execute", async () => {
    const executeSpy = jest.spyOn(sut, "execute");
    const httpRequest = { body: { name: "test" }, userId: "user_id" };
    await sut.handle(httpRequest);
    expect(executeSpy).toHaveBeenCalledWith(httpRequest);
  });

  it("should return serverError (500) when execute throws synchronously", async () => {
    const errorSut = new ControllerSyncErrorStub();
    const result = await errorSut.handle({ body: {} });
    expect(result.statusCode).toBe(500);
    expect(result.data.name).toBe("ServerError");
  });

  it("should propagate rejection when execute rejects asynchronously (no await)", async () => {
    const errorSut = new ControllerAsyncErrorStub();
    await expect(errorSut.handle({ body: {} })).rejects.toThrow("async_error");
  });

  it("should handle httpRequest with all optional fields", async () => {
    const httpRequest: HttpRequest = {
      body: { data: "value" },
      headers: { authorization: "Bearer token" },
      params: { id: "123" },
      query: { page: "1" },
      userId: "user_123",
    };
    const result = await sut.handle(httpRequest);
    expect(result).toEqual({ statusCode: 200, data: { success: true } });
  });

  it("should be an abstract class requiring execute implementation", () => {
    expect(sut).toBeInstanceOf(Controller);
    expect(typeof sut.execute).toBe("function");
    expect(typeof sut.handle).toBe("function");
  });
});
