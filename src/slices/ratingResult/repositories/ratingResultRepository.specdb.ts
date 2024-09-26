import {
  fakeRatingResultAverage,
  fakeRatingResultEntity,
  fakeRatingResultPaginated,
} from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { RatingResultRepository } from "./ratingResultRepository";

describe("RatingResult Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: RatingResultRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeRatingResultEntity);
    repository.getOne.mockResolvedValue(fakeRatingResultEntity);
    repository.update.mockResolvedValue(fakeRatingResultEntity);
    repository.getPaginate.mockResolvedValue(fakeRatingResultPaginated?.ratingResults);
    repository.getCount.mockResolvedValue(fakeRatingResultPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
    repository.aggregate.mockResolvedValue([fakeRatingResultAverage]);
  });
  beforeEach(async () => {
    testInstance = new RatingResultRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addRatingResult with correct values", async () => {
    await testInstance.addRatingResult(fakeRatingResultEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeRatingResultEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new ratingResult created when addRatingResult insert it", async () => {
    const result = await testInstance.addRatingResult(fakeRatingResultEntity);
    expect(result).toEqual(fakeRatingResultEntity);
  });
  test("should return null when addRatingResult returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addRatingResult(fakeRatingResultEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addRatingResult throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addRatingResult(fakeRatingResultEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateRatingResult throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateRatingResult(fakeQuery, fakeRatingResultEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateRatingResult with correct values", async () => {
    await testInstance.updateRatingResult(fakeQuery, fakeRatingResultEntity);
    expect(repository.update).toHaveBeenCalledWith(
      fakeQuery?.fields,
      fakeRatingResultEntity
    );
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a ratingResult updated when updateRatingResult update it", async () => {
    const result = await testInstance.updateRatingResult(
      fakeQuery,
      fakeRatingResultEntity
    );
    expect(result).toEqual(fakeRatingResultEntity);
  });
  test("should return a ratingResult updated when updateRatingResult update it when i pass null", async () => {
    const result = await testInstance.updateRatingResult(
      null as any,
      fakeRatingResultEntity
    );
    expect(result).toEqual(fakeRatingResultEntity);
  });
  test("should return null when updateRatingResult returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateRatingResult(
      fakeQuery,
      fakeRatingResultEntity
    );
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateRatingResult throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateRatingResult(fakeQuery, fakeRatingResultEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteRatingResult with correct values", async () => {
    await testInstance.deleteRatingResult(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new ratingResult created when deleteRatingResult insert it", async () => {
    const result = await testInstance.deleteRatingResult(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteRatingResult returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteRatingResult(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteRatingResult throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteRatingResult(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadRatingResult with correct values", async () => {
    await testInstance.loadRatingResult(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a ratingResult when loadRatingResult loaded it", async () => {
    const result = await testInstance.loadRatingResult(fakeQuery);
    expect(result).toEqual(fakeRatingResultEntity);
  });
  test("should return null when loadRatingResult returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadRatingResult(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadRatingResult returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadRatingResult(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadRatingResult throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadRatingResult(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadRatingResultByPage with correct values", async () => {
    await testInstance.loadRatingResultByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadRatingResultByPage with correct values", async () => {
    await testInstance.loadRatingResultByPage(fakeQuery);
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
  test("should return a ratingResultByPage when loadRatingResultByPage loaded it", async () => {
    const result = await testInstance.loadRatingResultByPage(fakeQuery);
    expect(result).toEqual(fakeRatingResultPaginated);
  });
  test("should return null when loadRatingResultByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadRatingResultByPage(fakeQuery);
    expect(result).toEqual({ ratingResults: null, total: 0 });
  });
  test("should return null when loadRatingResultByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadRatingResultByPage(null as any);
    expect(result).toEqual({ ratingResults: null, total: 0 });
  });
  test("should rethrow if load of loadRatingResultByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadRatingResultByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
