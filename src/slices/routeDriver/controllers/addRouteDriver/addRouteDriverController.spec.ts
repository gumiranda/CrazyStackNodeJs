import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddRouteDriverController } from "./addRouteDriverController";
import { fakeRouteDriverEntity } from "@/slices/routeDriver/entities/RouteDriverEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddRouteDriverController", () => {
  let testInstance: AddRouteDriverController;
  let addRouteDriver: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addRouteDriver = jest.fn();
    addRouteDriver.mockResolvedValue({
      ...fakeRouteDriverEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddRouteDriverController(validation, addRouteDriver);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeRouteDriverEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeRouteDriverEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addRouteDriver with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeRouteDriverEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeRouteDriverEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addRouteDriver).toHaveBeenCalledWith({
      ...fakeRouteDriverEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addRouteDriver).toHaveBeenCalledTimes(1);
  });
  test("should throws if addRouteDriver throw", async () => {
    addRouteDriver.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeRouteDriverEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRouteDriverEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
