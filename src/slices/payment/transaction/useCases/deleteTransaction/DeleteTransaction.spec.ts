import { fakeTransactionEntity } from "@/slices/payment/transaction/entities/TransactionEntity.spec";
import { TransactionEntity } from "@/slices/payment/transaction/entities";
import { DeleteTransactionRepository } from "@/slices/payment/transaction/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteTransaction } from "./DeleteTransaction";
import { Query } from "@/application/types";

describe("deleteTransaction", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteTransactionRepository: MockProxy<DeleteTransactionRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteTransactionRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    deleteTransactionRepository.deleteTransaction.mockResolvedValue(fakeTransactionEntity);
  });
  beforeEach(() => {
    testInstance = deleteTransaction(deleteTransactionRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteTransaction of DeleteTransactionRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteTransactionRepository.deleteTransaction).toHaveBeenCalledWith(fakeQuery);
    expect(deleteTransactionRepository.deleteTransaction).toHaveBeenCalledTimes(1);
  });
  it("should return a new transaction deleted when deleteTransactionRepository delete it", async () => {
    const transaction = await testInstance(fakeQuery);
    expect(transaction).toEqual(fakeTransactionEntity);
  });
  it("should return null a new transaction deleted when deleteTransactionRepository delete it", async () => {
    deleteTransactionRepository.deleteTransaction.mockResolvedValue(null);
    const transaction = await testInstance(fakeTransactionEntity);
    expect(transaction).toBeNull();
  });
  it("should rethrow if deleteTransaction of DeleteTransactionRepository throws", async () => {
    deleteTransactionRepository.deleteTransaction.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
