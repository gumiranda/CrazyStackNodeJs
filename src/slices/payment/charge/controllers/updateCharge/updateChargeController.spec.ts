import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateChargeController } from "./updateChargeController";
import { fakeChargeEntity } from "@/slices/payment/charge/entities/ChargeEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateChargeController", () => {
  let testInstance: UpdateChargeController;
  let updateCharge: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateCharge = jest.fn();
    updateCharge.mockResolvedValue({
      ...fakeChargeEntity,
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
    testInstance = new UpdateChargeController(
      validationQuery,
      validationBody,
      updateCharge
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeChargeEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeChargeEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeChargeEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeChargeEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateCharge with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeChargeEntity,
      query: fakeChargeEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeChargeEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateCharge).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeChargeEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeChargeEntity
    );
    expect(updateCharge).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateCharge throw", async () => {
    updateCharge.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeChargeEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeChargeEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeChargeEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
