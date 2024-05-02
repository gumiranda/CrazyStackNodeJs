import {
  fakeTransactionEntity,
  fakeTransactionPaginated,
} from "@/slices/payment/transaction/entities/TransactionEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { TransactionRepository } from "./transactionRepository";

describe("Transaction Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: TransactionRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeTransactionEntity);
    repository.getOne.mockResolvedValue(fakeTransactionEntity);
    repository.update.mockResolvedValue(fakeTransactionEntity);
    repository.getPaginate.mockResolvedValue(fakeTransactionPaginated?.transactions);
    repository.getCount.mockResolvedValue(fakeTransactionPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new TransactionRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addTransaction with correct values", async () => {
    await testInstance.addTransaction(fakeTransactionEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeTransactionEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new transaction created when addTransaction insert it", async () => {
    const result = await testInstance.addTransaction(fakeTransactionEntity);
    expect(result).toEqual(fakeTransactionEntity);
  });
  test("should return null when addTransaction returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addTransaction(fakeTransactionEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addTransaction throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addTransaction(fakeTransactionEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateTransaction throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateTransaction(fakeQuery, fakeTransactionEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateTransaction with correct values", async () => {
    await testInstance.updateTransaction(fakeQuery, fakeTransactionEntity);
    expect(repository.update).toHaveBeenCalledWith(
      fakeQuery?.fields,
      fakeTransactionEntity
    );
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a transaction updated when updateTransaction update it", async () => {
    const result = await testInstance.updateTransaction(fakeQuery, fakeTransactionEntity);
    expect(result).toEqual(fakeTransactionEntity);
  });
  test("should return a transaction updated when updateTransaction update it when i pass null", async () => {
    const result = await testInstance.updateTransaction(
      null as any,
      fakeTransactionEntity
    );
    expect(result).toEqual(fakeTransactionEntity);
  });
  test("should return null when updateTransaction returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateTransaction(fakeQuery, fakeTransactionEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateTransaction throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateTransaction(fakeQuery, fakeTransactionEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteTransaction with correct values", async () => {
    await testInstance.deleteTransaction(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new transaction created when deleteTransaction insert it", async () => {
    const result = await testInstance.deleteTransaction(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteTransaction returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteTransaction(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteTransaction throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteTransaction(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadTransaction with correct values", async () => {
    await testInstance.loadTransaction(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a transaction when loadTransaction loaded it", async () => {
    const result = await testInstance.loadTransaction(fakeQuery);
    expect(result).toEqual(fakeTransactionEntity);
  });
  test("should return null when loadTransaction returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadTransaction(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadTransaction returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadTransaction(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadTransaction throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadTransaction(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadTransactionByPage with correct values", async () => {
    await testInstance.loadTransactionByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadTransactionByPage with correct values", async () => {
    await testInstance.loadTransactionByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(
      0,
      fakeQuery?.fields,
      {
        createdAt: -1,
      },
      10,
      {}
    );
    expect(repository.getPaginate).toHaveBeenCalledTimes(1);
  });
  test("should return a transactionByPage when loadTransactionByPage loaded it", async () => {
    const result = await testInstance.loadTransactionByPage(fakeQuery);
    expect(result).toEqual(fakeTransactionPaginated);
  });
  test("should return null when loadTransactionByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadTransactionByPage(fakeQuery);
    expect(result).toEqual({ transactions: null, total: 0 });
  });
  test("should return null when loadTransactionByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadTransactionByPage(null as any);
    expect(result).toEqual({ transactions: null, total: 0 });
  });
  test("should rethrow if load of loadTransactionByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadTransactionByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
