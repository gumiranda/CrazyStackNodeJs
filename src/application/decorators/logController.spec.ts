import { describe, test, expect, beforeEach, beforeAll, jest, mock as bunMock } from "bun:test";
import { mock, MockProxy } from "jest-mock-extended";
import { LogRepository, Controller } from "@/application/infra/contracts";
import { LogController } from "./logController";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { HttpRequest, ok, serverError } from "@/application/helpers/http";

bunMock.module("@/application/infra/database/mongodb/repository", () => ({
  LogMongoRepository: jest.fn(),
}));
import { makeLogController } from "./logControllerFactory";

describe("logController", () => {
  let testInstance: LogController;
  let logRepository: MockProxy<LogRepository>;
  let controller: MockProxy<Controller>;
  let fakeRequest: HttpRequest;
  beforeAll(() => {
    logRepository = mock();
    controller = mock();
    controller.execute.mockResolvedValue(ok(fakeUserEntity));
    controller.handle.mockResolvedValue(ok(fakeUserEntity));
    logRepository.logError.mockResolvedValue();
    fakeRequest = { body: fakeUserEntity };
  });
  beforeEach(() => {
    jest.clearAllMocks();
    testInstance = new LogController("user", controller, logRepository);
  });
  test("should call controller execute with correct params", async () => {
    await testInstance.handle(fakeRequest);
    expect(controller.execute).toHaveBeenCalledWith(fakeRequest);
    expect(controller.execute).toHaveBeenCalledTimes(1);
  });
  test("should call logRepository if i got server error", async () => {
    controller.execute.mockResolvedValueOnce(serverError(new Error("any_error")));
    await testInstance.handle(fakeRequest);
    expect(logRepository.logError).toHaveBeenCalledWith(
      "user",
      serverError(new Error("any_error")).data
    );
    expect(logRepository.logError).toHaveBeenCalledTimes(1);
  });
});

describe("makeLogController", () => {
  test("should return a LogController instance", () => {
    const fakeController = mock<Controller>();
    const result = makeLogController("test_domain", fakeController);
    expect(result).toBeInstanceOf(LogController);
  });
});
