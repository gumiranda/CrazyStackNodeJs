import { LoadTransactionRepository } from "@/slices/payment/transaction/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTransactionEntity } from "@/slices/payment/transaction/entities/TransactionEntity.spec";
import { LoadTransaction, loadTransaction } from "./LoadTransaction";

describe("LoadTransaction", () => {
  let fakeQuery: Query;
  let testInstance: LoadTransaction;
  let loadTransactionRepository: MockProxy<LoadTransactionRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadTransactionRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadTransactionRepository.loadTransaction.mockResolvedValue(fakeTransactionEntity);
  });
  beforeEach(() => {
    testInstance = loadTransaction(loadTransactionRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadTransaction of LoadTransactionRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadTransactionRepository.loadTransaction).toHaveBeenCalledWith(fakeQuery);
    expect(loadTransactionRepository.loadTransaction).toHaveBeenCalledTimes(1);
  });
  it("should return a transaction loaded when loadTransactionRepository insert it", async () => {
    const transaction = await testInstance(fakeQuery);
    expect(transaction).toEqual(fakeTransactionEntity);
  });
  it("should return null a new transaction loaded when loadTransactionRepository return it", async () => {
    loadTransactionRepository.loadTransaction.mockResolvedValue(null);
    const transaction = await testInstance(fakeQuery);
    expect(transaction).toBeNull();
  });
  it("should rethrow if loadTransaction of LoadTransactionRepository throws", async () => {
    loadTransactionRepository.loadTransaction.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
