import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateTransactionController } from "./updateTransactionController";
import { fakeTransactionEntity } from "@/slices/payment/transaction/entities/TransactionEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateTransactionController", () => {
  let testInstance: UpdateTransactionController;
  let updateTransaction: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateTransaction = jest.fn();
    updateTransaction.mockResolvedValue({
      ...fakeTransactionEntity,
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
    testInstance = new UpdateTransactionController(
      validationQuery,
      validationBody,
      updateTransaction
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeTransactionEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeTransactionEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeTransactionEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeTransactionEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateTransaction with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeTransactionEntity,
      query: fakeTransactionEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeTransactionEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateTransaction).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeTransactionEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeTransactionEntity
    );
    expect(updateTransaction).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateTransaction throw", async () => {
    updateTransaction.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeTransactionEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeTransactionEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeTransactionEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
