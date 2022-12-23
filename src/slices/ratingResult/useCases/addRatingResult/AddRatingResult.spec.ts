import { fakeRatingResultEntity } from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { RatingResultEntity } from "@/slices/ratingResult/entities";
import { AddRatingResultRepository } from "@/slices/ratingResult/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addRatingResult } from "./AddRatingResult";

describe("addRatingResult", () => {
  let testInstance: any;
  let addRatingResultRepository: MockProxy<AddRatingResultRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addRatingResultRepository = mock();
    addRatingResultRepository.addRatingResult.mockResolvedValue(fakeRatingResultEntity);
  });
  beforeEach(() => {
    testInstance = addRatingResult(addRatingResultRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addRatingResult of AddRatingResultRepository with correct values", async () => {
    await testInstance(fakeRatingResultEntity);
    expect(addRatingResultRepository.addRatingResult).toHaveBeenCalledWith(
      new RatingResultEntity(fakeRatingResultEntity)
    );
    expect(addRatingResultRepository.addRatingResult).toHaveBeenCalledTimes(1);
  });
  it("should return a new ratingResult created when addRatingResultRepository insert it", async () => {
    const ratingResult = await testInstance(fakeRatingResultEntity);
    expect(ratingResult).toEqual(fakeRatingResultEntity);
  });
  it("should return null a new ratingResult created when addRatingResultRepository insert it", async () => {
    addRatingResultRepository.addRatingResult.mockResolvedValue(null);
    const ratingResult = await testInstance(fakeRatingResultEntity);
    expect(ratingResult).toBeNull();
  });
  it("should rethrow if addRatingResult of AddRatingResultRepository throws", async () => {
    addRatingResultRepository.addRatingResult.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeRatingResultEntity)).rejects.toThrowError("any_error");
  });
});
