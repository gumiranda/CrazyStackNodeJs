import {
  fakeOwnerEntity,
  fakeOwnerPaginated,
} from "@/slices/owner/entities/OwnerEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { OwnerData, OwnerPaginated } from "@/slices/owner/entities";
import {
  AddOwnerRepository,
  DeleteOwnerRepository,
  LoadOwnerByPageRepository,
  LoadOwnerRepository,
  UpdateOwnerRepository,
} from "./contracts";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { OwnerRepository } from "./ownerRepository";

describe("Owner Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: OwnerRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeOwnerEntity);
    repository.getOne.mockResolvedValue(fakeOwnerEntity);
    repository.update.mockResolvedValue(fakeOwnerEntity);
    repository.getPaginate.mockResolvedValue(fakeOwnerPaginated?.owners);
    repository.getCount.mockResolvedValue(fakeOwnerPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new OwnerRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addOwner with correct values", async () => {
    await testInstance.addOwner(fakeOwnerEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeOwnerEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new owner created when addOwner insert it", async () => {
    const result = await testInstance.addOwner(fakeOwnerEntity);
    expect(result).toEqual(fakeOwnerEntity);
  });
  test("should return null when addOwner returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addOwner(fakeOwnerEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addOwner throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addOwner(fakeOwnerEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateOwner throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateOwner(fakeQuery, fakeOwnerEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateOwner with correct values", async () => {
    await testInstance.updateOwner(fakeQuery, fakeOwnerEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeOwnerEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a owner updated when updateOwner update it", async () => {
    const result = await testInstance.updateOwner(fakeQuery, fakeOwnerEntity);
    expect(result).toEqual(fakeOwnerEntity);
  });
  test("should return a owner updated when updateOwner update it when i pass null", async () => {
    const result = await testInstance.updateOwner(null as any, fakeOwnerEntity);
    expect(result).toEqual(fakeOwnerEntity);
  });
  test("should return null when updateOwner returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateOwner(fakeQuery, fakeOwnerEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateOwner throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateOwner(fakeQuery, fakeOwnerEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteOwner with correct values", async () => {
    await testInstance.deleteOwner(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new owner created when deleteOwner insert it", async () => {
    const result = await testInstance.deleteOwner(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteOwner returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteOwner(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteOwner throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteOwner(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadOwner with correct values", async () => {
    await testInstance.loadOwner(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a owner when loadOwner loaded it", async () => {
    const result = await testInstance.loadOwner(fakeQuery);
    expect(result).toEqual(fakeOwnerEntity);
  });
  test("should return null when loadOwner returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadOwner(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadOwner returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadOwner(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadOwner throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadOwner(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadOwnerByPage with correct values", async () => {
    await testInstance.loadOwnerByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadOwnerByPage with correct values", async () => {
    await testInstance.loadOwnerByPage(fakeQuery);
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
  test("should return a ownerByPage when loadOwnerByPage loaded it", async () => {
    const result = await testInstance.loadOwnerByPage(fakeQuery);
    expect(result).toEqual(fakeOwnerPaginated);
  });
  test("should return null when loadOwnerByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadOwnerByPage(fakeQuery);
    expect(result).toEqual({ owners: null, total: 0 });
  });
  test("should return null when loadOwnerByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadOwnerByPage(null as any);
    expect(result).toEqual({ owners: null, total: 0 });
  });
  test("should rethrow if load of loadOwnerByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadOwnerByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
