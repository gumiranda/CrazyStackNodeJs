import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateCarController } from "./updateCarController";
import { fakeCarEntity } from "@/slices/car/entities/CarEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateCarController", () => {
  let testInstance: UpdateCarController;
  let updateCar: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateCar = jest.fn();
    updateCar.mockResolvedValue({
      ...fakeCarEntity,
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
    testInstance = new UpdateCarController(validationQuery, validationBody, updateCar);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeCarEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeCarEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeCarEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeCarEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateCar with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeCarEntity,
      query: fakeCarEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeCarEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateCar).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeCarEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeCarEntity
    );
    expect(updateCar).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateCar throw", async () => {
    updateCar.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeCarEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeCarEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeCarEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
