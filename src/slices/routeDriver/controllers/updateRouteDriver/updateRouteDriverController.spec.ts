import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateRouteDriverController } from "./updateRouteDriverController";
import { fakeRouteDriverEntity } from "@/slices/routeDriver/entities/RouteDriverEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateRouteDriverController", () => {
  let testInstance: UpdateRouteDriverController;
  let updateRouteDriver: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateRouteDriver = jest.fn();
    updateRouteDriver.mockResolvedValue({
      ...fakeRouteDriverEntity,
      createdById: fakeUserEntity?._id,
    });
    validationQuery = mock();
    validationQuery.validate.mockResolvedValue([] as never);
    validationBody = mock();
    validationBody.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new UpdateRouteDriverController(
      validationQuery,
      validationBody,
      updateRouteDriver
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeRouteDriverEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeRouteDriverEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeRouteDriverEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeRouteDriverEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateRouteDriver with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeRouteDriverEntity,
      query: fakeRouteDriverEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeRouteDriverEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateRouteDriver).toHaveBeenCalledWith(
       {
        fields: {
         ...fakeRouteDriverEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeRouteDriverEntity
    );
    expect(updateRouteDriver).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateRouteDriver throw", async () => {
    updateRouteDriver.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeRouteDriverEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRouteDriverEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeRouteDriverEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
