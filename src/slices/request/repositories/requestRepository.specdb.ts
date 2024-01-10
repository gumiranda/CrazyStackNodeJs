import {
  fakeRequestEntity,
  fakeRequestPaginated,
} from "@/slices/request/entities/RequestEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { RequestData, RequestPaginated } from "@/slices/request/entities";
import {
  AddRequestRepository,
  DeleteRequestRepository,
  LoadRequestByPageRepository,
  LoadRequestRepository,
  UpdateRequestRepository,
} from "./contracts";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { RequestRepository } from "./requestRepository";

describe("Request Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: RequestRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeRequestEntity);
    repository.getOne.mockResolvedValue(fakeRequestEntity);
    repository.update.mockResolvedValue(fakeRequestEntity);
    repository.getPaginate.mockResolvedValue(fakeRequestPaginated?.requests);
    repository.getCount.mockResolvedValue(fakeRequestPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new RequestRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addRequest with correct values", async () => {
    await testInstance.addRequest(fakeRequestEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeRequestEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new request created when addRequest insert it", async () => {
    const result = await testInstance.addRequest(fakeRequestEntity);
    expect(result).toEqual(fakeRequestEntity);
  });
  test("should return null when addRequest returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addRequest(fakeRequestEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addRequest throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addRequest(fakeRequestEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateRequest throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateRequest(fakeQuery, fakeRequestEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateRequest with correct values", async () => {
    await testInstance.updateRequest(fakeQuery, fakeRequestEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeRequestEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a request updated when updateRequest update it", async () => {
    const result = await testInstance.updateRequest(fakeQuery, fakeRequestEntity);
    expect(result).toEqual(fakeRequestEntity);
  });
  test("should return a request updated when updateRequest update it when i pass null", async () => {
    const result = await testInstance.updateRequest(null as any, fakeRequestEntity);
    expect(result).toEqual(fakeRequestEntity);
  });
  test("should return null when updateRequest returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateRequest(fakeQuery, fakeRequestEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateRequest throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateRequest(fakeQuery, fakeRequestEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteRequest with correct values", async () => {
    await testInstance.deleteRequest(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new request created when deleteRequest insert it", async () => {
    const result = await testInstance.deleteRequest(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteRequest returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteRequest(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteRequest throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteRequest(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadRequest with correct values", async () => {
    await testInstance.loadRequest(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a request when loadRequest loaded it", async () => {
    const result = await testInstance.loadRequest(fakeQuery);
    expect(result).toEqual(fakeRequestEntity);
  });
  test("should return null when loadRequest returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadRequest(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadRequest returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadRequest(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadRequest throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadRequest(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadRequestByPage with correct values", async () => {
    await testInstance.loadRequestByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadRequestByPage with correct values", async () => {
    await testInstance.loadRequestByPage(fakeQuery);
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
  test("should return a requestByPage when loadRequestByPage loaded it", async () => {
    const result = await testInstance.loadRequestByPage(fakeQuery);
    expect(result).toEqual(fakeRequestPaginated);
  });
  test("should return null when loadRequestByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadRequestByPage(fakeQuery);
    expect(result).toEqual({ requests: null, total: 0 });
  });
  test("should return null when loadRequestByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadRequestByPage(null as any);
    expect(result).toEqual({ requests: null, total: 0 });
  });
  test("should rethrow if load of loadRequestByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadRequestByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
