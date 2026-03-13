import { describe, test, expect, beforeAll, beforeEach, afterAll, jest } from "bun:test";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { RequestRepository } from "./requestRepository";
import { fakeRequestEntity, fakeRequestPaginated } from "@/slices/request/entities/RequestEntity.spec";

describe("RequestRepository", () => {
  let fakeQuery: Query;
  let testInstance: RequestRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    repository = mock<Repository>();
    fakeQuery = { fields: { name: "123" }, options: {} };
    repository.add.mockResolvedValue(fakeRequestEntity);
    repository.getOne.mockResolvedValue(fakeRequestEntity);
    repository.update.mockResolvedValue(fakeRequestEntity);
    repository.getPaginate.mockResolvedValue(fakeRequestPaginated?.requests);
    repository.getCount.mockResolvedValue(fakeRequestPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(() => {
    jest.clearAllMocks();
    testInstance = new RequestRepository(repository);
  });
  afterAll(() => { MockDate.reset(); });
  test("should call add of addRequest with correct values", async () => {
    await testInstance.addRequest(fakeRequestEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeRequestEntity);
  });
  test("should return a new request", async () => {
    expect(await testInstance.addRequest(fakeRequestEntity)).toEqual(fakeRequestEntity);
  });
  test("should return null when addRequest returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    expect(await testInstance.addRequest(fakeRequestEntity)).toBeNull();
  });
  test("should rethrow if addRequest throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.addRequest(fakeRequestEntity)).rejects.toThrow("Error");
  });
  test("should call deleteOne with correct values", async () => {
    await testInstance.deleteRequest(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
  });
  test("should return null when deleteRequest returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    expect(await testInstance.deleteRequest(fakeQuery)).toBeNull();
  });
  test("should rethrow if deleteRequest throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.deleteRequest(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getOne of loadRequest with correct values", async () => {
    await testInstance.loadRequest(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
  });
  test("should return request when loadRequest loads it", async () => {
    expect(await testInstance.loadRequest(fakeQuery)).toEqual(fakeRequestEntity);
  });
  test("should return null when loadRequest returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    expect(await testInstance.loadRequest(fakeQuery)).toBeNull();
  });
  test("should rethrow if loadRequest throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadRequest(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getPaginate of loadRequestByPage with correct values", async () => {
    await testInstance.loadRequestByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(0, fakeQuery?.fields, { createdAt: -1 }, 10, {});
  });
  test("should return paginated requests", async () => {
    expect(await testInstance.loadRequestByPage(fakeQuery)).toEqual(fakeRequestPaginated);
  });
  test("should return null when loadRequestByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    expect(await testInstance.loadRequestByPage(fakeQuery)).toEqual({ requests: null, total: 0 });
  });
  test("should rethrow if loadRequestByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadRequestByPage(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call update of updateRequest with correct values", async () => {
    await testInstance.updateRequest(fakeQuery, fakeRequestEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeRequestEntity);
  });
  test("should return updated request", async () => {
    expect(await testInstance.updateRequest(fakeQuery, fakeRequestEntity)).toEqual(fakeRequestEntity);
  });
  test("should return null when updateRequest returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    expect(await testInstance.updateRequest(fakeQuery, fakeRequestEntity)).toBeNull();
  });
  test("should rethrow if updateRequest throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.updateRequest(fakeQuery, fakeRequestEntity)).rejects.toThrow("Error");
  });
  test("should use default values when query has no fields or options", async () => {
    const result = await testInstance.loadRequestByPage({ fields: undefined, options: undefined } as any);
    expect(repository.getPaginate).toHaveBeenCalledWith(0, {}, { createdAt: -1 }, 10, {});
    expect(repository.getCount).toHaveBeenCalledWith({});
    expect(result).toBeDefined();
  });
  test("should use provided sort and projection when set", async () => {
    const query: any = { fields: { active: true }, options: { page: 2, sort: { name: 1 }, projection: { name: 1 } } };
    await testInstance.loadRequestByPage(query);
    expect(repository.getPaginate).toHaveBeenCalledWith(2, { active: true }, { name: 1 }, 10, { name: 1 });
  });
  test("should use defaults for loadRequest with null query", async () => {
    const result = await testInstance.loadRequest(null as any);
    expect(repository.getOne).toHaveBeenCalledWith({}, {});
    expect(result).toBeDefined();
  });
  test("should use defaults for updateRequest with null query", async () => {
    const result = await testInstance.updateRequest(null as any, fakeRequestEntity);
    expect(repository.update).toHaveBeenCalledWith({}, fakeRequestEntity);
    expect(result).toBeDefined();
  });
  test("should return truthy value when deleteRequest succeeds", async () => {
    repository.deleteOne.mockResolvedValueOnce(true);
    const result = await testInstance.deleteRequest(fakeQuery);
    expect(result).toBeTruthy();
  });
  test("should use defaults for deleteRequest with null query", async () => {
    repository.deleteOne.mockResolvedValueOnce(true);
    const result = await testInstance.deleteRequest(null as any);
    expect(repository.deleteOne).toHaveBeenCalledWith(undefined);
    expect(result).toBeTruthy();
  });
});
