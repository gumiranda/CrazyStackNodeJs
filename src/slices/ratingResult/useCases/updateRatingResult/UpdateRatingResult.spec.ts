import { UpdateRatingResultRepository } from "@/slices/ratingResult/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRatingResultEntity } from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { UpdateRatingResult, updateRatingResult } from "./UpdateRatingResult";

describe("UpdateRatingResult", () => {
  let fakeQuery: Query;
  let testInstance: UpdateRatingResult;
  let updateRatingResultRepository: MockProxy<UpdateRatingResultRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateRatingResultRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateRatingResultRepository.updateRatingResult.mockResolvedValue(
      fakeRatingResultEntity
    );
  });
  beforeEach(() => {
    testInstance = updateRatingResult(updateRatingResultRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateRatingResult of UpdateRatingResultRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeRatingResultEntity);
    expect(updateRatingResultRepository.updateRatingResult).toHaveBeenCalledWith(
      fakeQuery,
      fakeRatingResultEntity
    );
    expect(updateRatingResultRepository.updateRatingResult).toHaveBeenCalledTimes(1);
  });
  it("should return a ratingResult updateed when updateRatingResultRepository insert it", async () => {
    const ratingResult = await testInstance(fakeQuery, fakeRatingResultEntity);
    expect(ratingResult).toEqual(fakeRatingResultEntity);
  });
  it("should return null a new ratingResult updateed when updateRatingResultRepository return it", async () => {
    updateRatingResultRepository.updateRatingResult.mockResolvedValue(null);
    const ratingResult = await testInstance(fakeQuery, fakeRatingResultEntity);
    expect(ratingResult).toBeNull();
  });
  it("should rethrow if updateRatingResult of UpdateRatingResultRepository throws", async () => {
    updateRatingResultRepository.updateRatingResult.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery, fakeRatingResultEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
