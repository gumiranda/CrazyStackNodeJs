import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddMapRouteController } from "./addMapRouteController";
import { fakeMapRouteEntity } from "@/slices/mapRoute/entities/MapRouteEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddMapRouteController", () => {
  let testInstance: AddMapRouteController;
  let addMapRoute: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addMapRoute = jest.fn();
    addMapRoute.mockResolvedValue({
      ...fakeMapRouteEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddMapRouteController(validation, addMapRoute);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeMapRouteEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeMapRouteEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addMapRoute with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeMapRouteEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeMapRouteEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addMapRoute).toHaveBeenCalledWith({
      ...fakeMapRouteEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addMapRoute).toHaveBeenCalledTimes(1);
  });
  test("should throws if addMapRoute throw", async () => {
    addMapRoute.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeMapRouteEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeMapRouteEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
