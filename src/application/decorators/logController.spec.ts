import { mock, MockProxy } from "jest-mock-extended";
import { LogRepository, Controller } from "@/application/infra/contracts";
import { LogController } from "./logController";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { HttpRequest, ok, serverError } from "@/application/helpers/http";

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
