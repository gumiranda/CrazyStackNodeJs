import {
  fakeTrendEntity,
  fakeTrendPaginated,
} from "@/slices/social-network/trend/entities/TrendEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { TrendRepository } from "./trendRepository";

describe("Trend Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: TrendRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeTrendEntity);
    repository.getOne.mockResolvedValue(fakeTrendEntity);
    repository.update.mockResolvedValue(fakeTrendEntity);
    repository.getPaginate.mockResolvedValue(fakeTrendPaginated?.trends);
    repository.getCount.mockResolvedValue(fakeTrendPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new TrendRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addTrend with correct values", async () => {
    await testInstance.addTrend(fakeTrendEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeTrendEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new trend created when addTrend insert it", async () => {
    const result = await testInstance.addTrend(fakeTrendEntity);
    expect(result).toEqual(fakeTrendEntity);
  });
  test("should return null when addTrend returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addTrend(fakeTrendEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addTrend throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addTrend(fakeTrendEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateTrend throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateTrend(fakeQuery, fakeTrendEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateTrend with correct values", async () => {
    await testInstance.updateTrend(fakeQuery, fakeTrendEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeTrendEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a trend updated when updateTrend update it", async () => {
    const result = await testInstance.updateTrend(fakeQuery, fakeTrendEntity);
    expect(result).toEqual(fakeTrendEntity);
  });
  test("should return a trend updated when updateTrend update it when i pass null", async () => {
    const result = await testInstance.updateTrend(null as any, fakeTrendEntity);
    expect(result).toEqual(fakeTrendEntity);
  });
  test("should return null when updateTrend returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateTrend(fakeQuery, fakeTrendEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateTrend throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateTrend(fakeQuery, fakeTrendEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteTrend with correct values", async () => {
    await testInstance.deleteTrend(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new trend created when deleteTrend insert it", async () => {
    const result = await testInstance.deleteTrend(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteTrend returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteTrend(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteTrend throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteTrend(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadTrend with correct values", async () => {
    await testInstance.loadTrend(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a trend when loadTrend loaded it", async () => {
    const result = await testInstance.loadTrend(fakeQuery);
    expect(result).toEqual(fakeTrendEntity);
  });
  test("should return null when loadTrend returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadTrend(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadTrend returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadTrend(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadTrend throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadTrend(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadTrendByPage with correct values", async () => {
    await testInstance.loadTrendByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadTrendByPage with correct values", async () => {
    await testInstance.loadTrendByPage(fakeQuery);
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
  test("should return a trendByPage when loadTrendByPage loaded it", async () => {
    const result = await testInstance.loadTrendByPage(fakeQuery);
    expect(result).toEqual(fakeTrendPaginated);
  });
  test("should return null when loadTrendByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadTrendByPage(fakeQuery);
    expect(result).toEqual({ trends: null, total: 0 });
  });
  test("should return null when loadTrendByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadTrendByPage(null as any);
    expect(result).toEqual({ trends: null, total: 0 });
  });
  test("should rethrow if load of loadTrendByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadTrendByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
