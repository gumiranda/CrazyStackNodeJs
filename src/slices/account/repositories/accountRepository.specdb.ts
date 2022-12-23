import {
  fakeAccountEntity,
  fakeAccountPaginated,
} from "@/slices/account/entities/AccountEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { AccountRepository } from "./accountRepository";

describe("Account Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: AccountRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeAccountEntity);
    repository.getOne.mockResolvedValue(fakeAccountEntity);
    repository.update.mockResolvedValue(fakeAccountEntity);
    repository.getPaginate.mockResolvedValue(fakeAccountPaginated?.accounts);
    repository.getCount.mockResolvedValue(fakeAccountPaginated?.total);
    repository.deleteMany.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new AccountRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addAccount with correct values", async () => {
    await testInstance.addAccount(fakeAccountEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeAccountEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new account created when addAccount insert it", async () => {
    const result = await testInstance.addAccount(fakeAccountEntity);
    expect(result).toEqual(fakeAccountEntity);
  });
  test("should return null when addAccount returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addAccount(fakeAccountEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addAccount throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addAccount(fakeAccountEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateAccount throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateAccount(fakeQuery, fakeAccountEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateAccount with correct values", async () => {
    await testInstance.updateAccount(fakeQuery, fakeAccountEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeAccountEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a account updated when updateAccount update it", async () => {
    const result = await testInstance.updateAccount(fakeQuery, fakeAccountEntity);
    expect(result).toEqual(fakeAccountEntity);
  });
  test("should return a account updated when updateAccount update it when i pass null", async () => {
    const result = await testInstance.updateAccount(null as any, fakeAccountEntity);
    expect(result).toEqual(fakeAccountEntity);
  });
  test("should return null when updateAccount returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateAccount(fakeQuery, fakeAccountEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateAccount throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateAccount(fakeQuery, fakeAccountEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteAccount with correct values", async () => {
    await testInstance.deleteAccount(fakeQuery);
    expect(repository.deleteMany).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteMany).toHaveBeenCalledTimes(1);
  });
  test("should return a new account created when deleteAccount insert it", async () => {
    const result = await testInstance.deleteAccount(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteAccount returns null", async () => {
    repository.deleteMany.mockResolvedValueOnce(null);
    const result = await testInstance.deleteAccount(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteAccount throws", async () => {
    repository.deleteMany.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteAccount(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadAccount with correct values", async () => {
    await testInstance.loadAccount(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a account when loadAccount loaded it", async () => {
    const result = await testInstance.loadAccount(fakeQuery);
    expect(result).toEqual(fakeAccountEntity);
  });
  test("should return null when loadAccount returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadAccount(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadAccount returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadAccount(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadAccount throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadAccount(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadAccountByPage with correct values", async () => {
    await testInstance.loadAccountByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadAccountByPage with correct values", async () => {
    await testInstance.loadAccountByPage(fakeQuery);
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
  test("should return a accountByPage when loadAccountByPage loaded it", async () => {
    const result = await testInstance.loadAccountByPage(fakeQuery);
    expect(result).toEqual(fakeAccountPaginated);
  });
  test("should return null when loadAccountByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadAccountByPage(fakeQuery);
    expect(result).toEqual({ accounts: null, total: 0 });
  });
  test("should return null when loadAccountByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadAccountByPage(null as any);
    expect(result).toEqual({ accounts: null, total: 0 });
  });
  test("should rethrow if load of loadAccountByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadAccountByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
