import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddTransactionController } from "./addTransactionController";
import { fakeTransactionEntity } from "@/slices/payment/transaction/entities/TransactionEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddTransactionController", () => {
  let testInstance: AddTransactionController;
  let addTransaction: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addTransaction = jest.fn();
    addTransaction.mockResolvedValue({
      ...fakeTransactionEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddTransactionController(validation, addTransaction);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeTransactionEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeTransactionEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addTransaction with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeTransactionEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeTransactionEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addTransaction).toHaveBeenCalledWith({
      ...fakeTransactionEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addTransaction).toHaveBeenCalledTimes(1);
  });
  test("should throws if addTransaction throw", async () => {
    addTransaction.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeTransactionEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeTransactionEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
