import {
  fakeFollowEntity,
  fakeFollowPaginated,
} from "@/slices/social-network/follow/entities/FollowEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { FollowRepository } from "./followRepository";

describe("Follow Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: FollowRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { user1Slug: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeFollowEntity);
    repository.getOne.mockResolvedValue(fakeFollowEntity);
    repository.update.mockResolvedValue(fakeFollowEntity);
    repository.getPaginate.mockResolvedValue(fakeFollowPaginated?.follows);
    repository.getCount.mockResolvedValue(fakeFollowPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new FollowRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addFollow with correct values", async () => {
    await testInstance.addFollow(fakeFollowEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeFollowEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new follow created when addFollow insert it", async () => {
    const result = await testInstance.addFollow(fakeFollowEntity);
    expect(result).toEqual(fakeFollowEntity);
  });
  test("should return null when addFollow returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addFollow(fakeFollowEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addFollow throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addFollow(fakeFollowEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateFollow throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateFollow(fakeQuery, fakeFollowEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateFollow with correct values", async () => {
    await testInstance.updateFollow(fakeQuery, fakeFollowEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeFollowEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a follow updated when updateFollow update it", async () => {
    const result = await testInstance.updateFollow(fakeQuery, fakeFollowEntity);
    expect(result).toEqual(fakeFollowEntity);
  });
  test("should return a follow updated when updateFollow update it when i pass null", async () => {
    const result = await testInstance.updateFollow(null as any, fakeFollowEntity);
    expect(result).toEqual(fakeFollowEntity);
  });
  test("should return null when updateFollow returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateFollow(fakeQuery, fakeFollowEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateFollow throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateFollow(fakeQuery, fakeFollowEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteFollow with correct values", async () => {
    await testInstance.deleteFollow(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new follow created when deleteFollow insert it", async () => {
    const result = await testInstance.deleteFollow(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteFollow returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteFollow(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteFollow throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteFollow(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadFollow with correct values", async () => {
    await testInstance.loadFollow(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a follow when loadFollow loaded it", async () => {
    const result = await testInstance.loadFollow(fakeQuery);
    expect(result).toEqual(fakeFollowEntity);
  });
  test("should return null when loadFollow returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadFollow(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadFollow returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadFollow(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadFollow throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadFollow(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadFollowByPage with correct values", async () => {
    await testInstance.loadFollowByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadFollowByPage with correct values", async () => {
    await testInstance.loadFollowByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(
      0,
      fakeQuery?.fields,
      {
        createdAt: -1,
      },
      10,
      {},
      { users: true }
    );
    expect(repository.getPaginate).toHaveBeenCalledTimes(1);
  });
  test("should return a followByPage when loadFollowByPage loaded it", async () => {
    const result = await testInstance.loadFollowByPage(fakeQuery);
    expect(result).toEqual(fakeFollowPaginated);
  });
  test("should return null when loadFollowByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadFollowByPage(fakeQuery);
    expect(result).toEqual({ follows: null, total: 0 });
  });
  test("should return null when loadFollowByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadFollowByPage(null as any);
    expect(result).toEqual({ follows: null, total: 0 });
  });
  test("should rethrow if load of loadFollowByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadFollowByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
