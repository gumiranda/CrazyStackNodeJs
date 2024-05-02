import { fakeTransactionEntity } from "@/slices/payment/transaction/entities/TransactionEntity.spec";
import { TransactionEntity } from "@/slices/payment/transaction/entities";
import { AddTransactionRepository } from "@/slices/payment/transaction/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addTransaction } from "./AddTransaction";

describe("addTransaction", () => {
  let testInstance: any;
  let addTransactionRepository: MockProxy<AddTransactionRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addTransactionRepository = mock();
    addTransactionRepository.addTransaction.mockResolvedValue(fakeTransactionEntity);
  });
  beforeEach(() => {
    testInstance = addTransaction(addTransactionRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addTransaction of AddTransactionRepository with correct values", async () => {
    await testInstance(fakeTransactionEntity);
    expect(addTransactionRepository.addTransaction).toHaveBeenCalledWith(
      new TransactionEntity(fakeTransactionEntity)
    );
    expect(addTransactionRepository.addTransaction).toHaveBeenCalledTimes(1);
  });
  it("should return a new transaction created when addTransactionRepository insert it", async () => {
    const transaction = await testInstance(fakeTransactionEntity);
    expect(transaction).toEqual(fakeTransactionEntity);
  });
  it("should return null a new transaction created when addTransactionRepository insert it", async () => {
    addTransactionRepository.addTransaction.mockResolvedValue(null);
    const transaction = await testInstance(fakeTransactionEntity);
    expect(transaction).toBeNull();
  });
  it("should rethrow if addTransaction of AddTransactionRepository throws", async () => {
    addTransactionRepository.addTransaction.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeTransactionEntity)).rejects.toThrowError("any_error");
  });
});
