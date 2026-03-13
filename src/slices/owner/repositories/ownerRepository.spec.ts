import { describe, test, expect, beforeAll, beforeEach, afterAll, jest } from "bun:test";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { OwnerRepository } from "./ownerRepository";
import { fakeOwnerEntity, fakeOwnerPaginated } from "@/slices/owner/entities/OwnerEntity.spec";

describe("OwnerRepository", () => {
  let fakeQuery: Query;
  let testInstance: OwnerRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    repository = mock<Repository>();
    fakeQuery = { fields: { name: "123" }, options: {} };
    repository.add.mockResolvedValue(fakeOwnerEntity);
    repository.getOne.mockResolvedValue(fakeOwnerEntity);
    repository.update.mockResolvedValue(fakeOwnerEntity);
    repository.getPaginate.mockResolvedValue(fakeOwnerPaginated?.owners);
    repository.getCount.mockResolvedValue(fakeOwnerPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(() => {
    jest.clearAllMocks();
    testInstance = new OwnerRepository(repository);
  });
  afterAll(() => { MockDate.reset(); });
  test("should call add of addOwner with correct values", async () => {
    await testInstance.addOwner(fakeOwnerEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeOwnerEntity);
  });
  test("should return a new owner when addOwner inserts it", async () => {
    const result = await testInstance.addOwner(fakeOwnerEntity);
    expect(result).toEqual(fakeOwnerEntity);
  });
  test("should return null when addOwner returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    expect(await testInstance.addOwner(fakeOwnerEntity)).toBeNull();
  });
  test("should rethrow if addOwner throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.addOwner(fakeOwnerEntity)).rejects.toThrow("Error");
  });
  test("should call deleteOne with correct values", async () => {
    await testInstance.deleteOwner(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
  });
  test("should return null when deleteOwner returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    expect(await testInstance.deleteOwner(fakeQuery)).toBeNull();
  });
  test("should rethrow if deleteOwner throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.deleteOwner(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getOne of loadOwner with correct values", async () => {
    await testInstance.loadOwner(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
  });
  test("should return owner when loadOwner loads it", async () => {
    expect(await testInstance.loadOwner(fakeQuery)).toEqual(fakeOwnerEntity);
  });
  test("should return null when loadOwner returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    expect(await testInstance.loadOwner(fakeQuery)).toBeNull();
  });
  test("should rethrow if loadOwner throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadOwner(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getPaginate of loadOwnerByPage with correct values", async () => {
    await testInstance.loadOwnerByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(0, fakeQuery?.fields, { createdAt: -1 }, 10, {});
  });
  test("should return paginated owners", async () => {
    expect(await testInstance.loadOwnerByPage(fakeQuery)).toEqual(fakeOwnerPaginated);
  });
  test("should return null when loadOwnerByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    expect(await testInstance.loadOwnerByPage(fakeQuery)).toEqual({ owners: null, total: 0 });
  });
  test("should rethrow if loadOwnerByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadOwnerByPage(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call update of updateOwner with correct values", async () => {
    await testInstance.updateOwner(fakeQuery, fakeOwnerEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeOwnerEntity);
  });
  test("should return updated owner", async () => {
    expect(await testInstance.updateOwner(fakeQuery, fakeOwnerEntity)).toEqual(fakeOwnerEntity);
  });
  test("should return null when updateOwner returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    expect(await testInstance.updateOwner(fakeQuery, fakeOwnerEntity)).toBeNull();
  });
  test("should rethrow if updateOwner throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.updateOwner(fakeQuery, fakeOwnerEntity)).rejects.toThrow("Error");
  });
  test("should use default values when query has no fields or options", async () => {
    const result = await testInstance.loadOwnerByPage({ fields: undefined, options: undefined } as any);
    expect(repository.getPaginate).toHaveBeenCalledWith(0, {}, { createdAt: -1 }, 10, {});
    expect(repository.getCount).toHaveBeenCalledWith({});
    expect(result).toBeDefined();
  });
  test("should use provided sort, page, limit and projection when set", async () => {
    const query: any = { fields: { active: true }, options: { page: 2, sort: { name: 1 }, limitPerPage: 20, projection: { name: 1 } } };
    await testInstance.loadOwnerByPage(query);
    expect(repository.getPaginate).toHaveBeenCalledWith(2, { active: true }, { name: 1 }, 20, { name: 1 });
  });
  test("should use defaults for loadOwner with null query", async () => {
    const result = await testInstance.loadOwner(null as any);
    expect(repository.getOne).toHaveBeenCalledWith({}, {});
    expect(result).toBeDefined();
  });
  test("should use defaults for updateOwner with null query", async () => {
    const result = await testInstance.updateOwner(null as any, fakeOwnerEntity);
    expect(repository.update).toHaveBeenCalledWith({}, fakeOwnerEntity);
    expect(result).toBeDefined();
  });
  test("should return truthy value when deleteOwner succeeds", async () => {
    repository.deleteOne.mockResolvedValueOnce(true);
    const result = await testInstance.deleteOwner(fakeQuery);
    expect(result).toBeTruthy();
  });
  test("should use defaults for deleteOwner with null query", async () => {
    repository.deleteOne.mockResolvedValueOnce(true);
    const result = await testInstance.deleteOwner(null as any);
    expect(repository.deleteOne).toHaveBeenCalledWith(undefined);
    expect(result).toBeTruthy();
  });
});
