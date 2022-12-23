import { fakeRatingEntity } from "@/slices/rating/entities/RatingEntity.spec";
import { RatingEntity } from "@/slices/rating/entities";
import { DeleteRatingRepository } from "@/slices/rating/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteRating } from "./DeleteRating";
import { Query } from "@/application/types";

describe("deleteRating", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteRatingRepository: MockProxy<DeleteRatingRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteRatingRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    deleteRatingRepository.deleteRating.mockResolvedValue(fakeRatingEntity);
  });
  beforeEach(() => {
    testInstance = deleteRating(deleteRatingRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteRating of DeleteRatingRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteRatingRepository.deleteRating).toHaveBeenCalledWith(fakeQuery);
    expect(deleteRatingRepository.deleteRating).toHaveBeenCalledTimes(1);
  });
  it("should return a new rating deleted when deleteRatingRepository delete it", async () => {
    const rating = await testInstance(fakeQuery);
    expect(rating).toEqual(fakeRatingEntity);
  });
  it("should return null a new rating deleted when deleteRatingRepository delete it", async () => {
    deleteRatingRepository.deleteRating.mockResolvedValue(null);
    const rating = await testInstance(fakeRatingEntity);
    expect(rating).toBeNull();
  });
  it("should rethrow if deleteRating of DeleteRatingRepository throws", async () => {
    deleteRatingRepository.deleteRating.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
