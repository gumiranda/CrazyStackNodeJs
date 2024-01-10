import {
  fakeRatingEntity,
  fakeRatingPaginated,
} from "@/slices/rating/entities/RatingEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { RatingData, RatingPaginated } from "@/slices/rating/entities";
import {
  AddRatingRepository,
  DeleteRatingRepository,
  LoadRatingByPageRepository,
  LoadRatingRepository,
  UpdateRatingRepository,
} from "./contracts";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { RatingRepository } from "./ratingRepository";

describe("Rating Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: RatingRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeRatingEntity);
    repository.getOne.mockResolvedValue(fakeRatingEntity);
    repository.update.mockResolvedValue(fakeRatingEntity);
    repository.getPaginate.mockResolvedValue(fakeRatingPaginated?.ratings);
    repository.getCount.mockResolvedValue(fakeRatingPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new RatingRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addRating with correct values", async () => {
    await testInstance.addRating(fakeRatingEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeRatingEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new rating created when addRating insert it", async () => {
    const result = await testInstance.addRating(fakeRatingEntity);
    expect(result).toEqual(fakeRatingEntity);
  });
  test("should return null when addRating returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addRating(fakeRatingEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addRating throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addRating(fakeRatingEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateRating throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateRating(fakeQuery, fakeRatingEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateRating with correct values", async () => {
    await testInstance.updateRating(fakeQuery, fakeRatingEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeRatingEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a rating updated when updateRating update it", async () => {
    const result = await testInstance.updateRating(fakeQuery, fakeRatingEntity);
    expect(result).toEqual(fakeRatingEntity);
  });
  test("should return a rating updated when updateRating update it when i pass null", async () => {
    const result = await testInstance.updateRating(null as any, fakeRatingEntity);
    expect(result).toEqual(fakeRatingEntity);
  });
  test("should return null when updateRating returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateRating(fakeQuery, fakeRatingEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateRating throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateRating(fakeQuery, fakeRatingEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteRating with correct values", async () => {
    await testInstance.deleteRating(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new rating created when deleteRating insert it", async () => {
    const result = await testInstance.deleteRating(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteRating returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteRating(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteRating throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteRating(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadRating with correct values", async () => {
    await testInstance.loadRating(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a rating when loadRating loaded it", async () => {
    const result = await testInstance.loadRating(fakeQuery);
    expect(result).toEqual(fakeRatingEntity);
  });
  test("should return null when loadRating returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadRating(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadRating returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadRating(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadRating throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadRating(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadRatingByPage with correct values", async () => {
    await testInstance.loadRatingByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadRatingByPage with correct values", async () => {
    await testInstance.loadRatingByPage(fakeQuery);
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
  test("should return a ratingByPage when loadRatingByPage loaded it", async () => {
    const result = await testInstance.loadRatingByPage(fakeQuery);
    expect(result).toEqual(fakeRatingPaginated);
  });
  test("should return null when loadRatingByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadRatingByPage(fakeQuery);
    expect(result).toEqual({ ratings: null, total: 0 });
  });
  test("should return null when loadRatingByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadRatingByPage(null as any);
    expect(result).toEqual({ ratings: null, total: 0 });
  });
  test("should rethrow if load of loadRatingByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadRatingByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
