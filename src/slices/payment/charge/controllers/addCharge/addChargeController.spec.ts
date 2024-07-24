import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddChargeController } from "./addChargeController";
import { fakeChargeEntity } from "@/slices/payment/charge/entities/ChargeEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddChargeController", () => {
  let testInstance: AddChargeController;
  let addCharge: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addCharge = jest.fn();
    addCharge.mockResolvedValue({
      ...fakeChargeEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddChargeController(validation, addCharge);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeChargeEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeChargeEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addCharge with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeChargeEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeChargeEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addCharge).toHaveBeenCalledWith({
      ...fakeChargeEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addCharge).toHaveBeenCalledTimes(1);
  });
  test("should throws if addCharge throw", async () => {
    addCharge.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeChargeEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeChargeEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
