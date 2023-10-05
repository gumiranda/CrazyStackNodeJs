import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddCarController } from "./addCarController";
import { fakeCarEntity } from "@/slices/car/entities/CarEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddCarController", () => {
  let testInstance: AddCarController;
  let addCar: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addCar = jest.fn();
    addCar.mockResolvedValue({
      ...fakeCarEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddCarController(validation, addCar);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeCarEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeCarEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addCar with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeCarEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeCarEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addCar).toHaveBeenCalledWith({
      ...fakeCarEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addCar).toHaveBeenCalledTimes(1);
  });
  test("should throws if addCar throw", async () => {
    addCar.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeCarEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeCarEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
