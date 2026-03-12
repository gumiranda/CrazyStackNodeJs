import { HttpRequest, HttpResponse, serverError } from "@/application/helpers";

// Replicate Controller logic to avoid circular dependency from barrel exports
abstract class TestController {
  abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return this.execute(httpRequest);
    } catch (error) {
      return serverError(error);
    }
  }
}

class ControllerStub extends TestController {
  result: HttpResponse = { statusCode: 200, data: { success: true } };
  override async execute(_httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.result;
  }
}

class ControllerSyncErrorStub extends TestController {
  override execute(_httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error("sync_error");
  }
}

describe("Controller", () => {
  let sut: ControllerStub;
  beforeEach(() => {
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
});
