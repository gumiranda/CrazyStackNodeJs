import { UpdateTransactionRepository } from "@/slices/payment/transaction/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTransactionEntity } from "@/slices/payment/transaction/entities/TransactionEntity.spec";
import { UpdateTransaction, updateTransaction } from "./UpdateTransaction";

describe("UpdateTransaction", () => {
  let fakeQuery: Query;
  let testInstance: UpdateTransaction;
  let updateTransactionRepository: MockProxy<UpdateTransactionRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateTransactionRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateTransactionRepository.updateTransaction.mockResolvedValue(fakeTransactionEntity);
  });
  beforeEach(() => {
    testInstance = updateTransaction(updateTransactionRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateTransaction of UpdateTransactionRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeTransactionEntity);
    expect(updateTransactionRepository.updateTransaction).toHaveBeenCalledWith(
      fakeQuery,
      fakeTransactionEntity
    );
    expect(updateTransactionRepository.updateTransaction).toHaveBeenCalledTimes(1);
  });
  it("should return a transaction updateed when updateTransactionRepository insert it", async () => {
    const transaction = await testInstance(fakeQuery, fakeTransactionEntity);
    expect(transaction).toEqual(fakeTransactionEntity);
  });
  it("should return null a new transaction updateed when updateTransactionRepository return it", async () => {
    updateTransactionRepository.updateTransaction.mockResolvedValue(null);
    const transaction = await testInstance(fakeQuery, fakeTransactionEntity);
    expect(transaction).toBeNull();
  });
  it("should rethrow if updateTransaction of UpdateTransactionRepository throws", async () => {
    updateTransactionRepository.updateTransaction.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery, fakeTransactionEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
