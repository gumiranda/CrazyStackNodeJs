import { LoadTransactionByPageRepository } from "@/slices/payment/transaction/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTransactionPaginated } from "@/slices/payment/transaction/entities/TransactionEntity.spec";
import { LoadTransactionByPage, loadTransactionByPage } from "./LoadTransactionByPage";

describe("LoadTransactionByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadTransactionByPage;
  let loadTransactionByPageRepository: MockProxy<LoadTransactionByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadTransactionByPageRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadTransactionByPageRepository.loadTransactionByPage.mockResolvedValue(
      fakeTransactionPaginated
    );
  });
  beforeEach(() => {
    testInstance = loadTransactionByPage(loadTransactionByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadTransactionByPage of LoadTransactionByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadTransactionByPageRepository.loadTransactionByPage).toHaveBeenCalledWith(
      fakeQuery
    );
    expect(loadTransactionByPageRepository.loadTransactionByPage).toHaveBeenCalledTimes(1);
  });
  it("should return a transaction loaded when loadTransactionByPageRepository insert it", async () => {
    const transaction = await testInstance(fakeQuery);
    expect(transaction).toEqual(fakeTransactionPaginated);
  });
  it("should return null a new transaction loaded when loadTransactionByPageRepository return it", async () => {
    loadTransactionByPageRepository.loadTransactionByPage.mockResolvedValue(null);
    const transaction = await testInstance(fakeQuery);
    expect(transaction).toBeNull();
  });
  it("should rethrow if loadTransactionByPage of LoadTransactionByPageRepository throws", async () => {
    loadTransactionByPageRepository.loadTransactionByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
