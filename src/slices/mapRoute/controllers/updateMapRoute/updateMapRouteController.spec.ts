import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateMapRouteController } from "./updateMapRouteController";
import { fakeMapRouteEntity } from "@/slices/mapRoute/entities/MapRouteEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateMapRouteController", () => {
  let testInstance: UpdateMapRouteController;
  let updateMapRoute: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateMapRoute = jest.fn();
    updateMapRoute.mockResolvedValue({
      ...fakeMapRouteEntity,
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
    testInstance = new UpdateMapRouteController(
      validationQuery,
      validationBody,
      updateMapRoute
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeMapRouteEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeMapRouteEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeMapRouteEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeMapRouteEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateMapRoute with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeMapRouteEntity,
      query: fakeMapRouteEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeMapRouteEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateMapRoute).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeMapRouteEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeMapRouteEntity
    );
    expect(updateMapRoute).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateMapRoute throw", async () => {
    updateMapRoute.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeMapRouteEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeMapRouteEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeMapRouteEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
