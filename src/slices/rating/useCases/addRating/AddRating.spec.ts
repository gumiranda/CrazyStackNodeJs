import { fakeRatingEntity } from "@/slices/rating/entities/RatingEntity.spec";
import { RatingEntity } from "@/slices/rating/entities";
import { AddRatingRepository } from "@/slices/rating/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addRating } from "./AddRating";

describe("addRating", () => {
    let testInstance: any;
    let addRatingRepository: MockProxy<AddRatingRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addRatingRepository = mock();
        addRatingRepository.addRating.mockResolvedValue(fakeRatingEntity);
    });
    beforeEach(() => {
        testInstance = addRating(addRatingRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addRating of AddRatingRepository with correct values", async () => {
        await testInstance(fakeRatingEntity);
        expect(addRatingRepository.addRating).toHaveBeenCalledWith(
            new RatingEntity(fakeRatingEntity)
        );
        expect(addRatingRepository.addRating).toHaveBeenCalledTimes(1);
    });
    it("should return a new rating created when addRatingRepository insert it", async () => {
        const rating = await testInstance(fakeRatingEntity);
        expect(rating).toEqual(fakeRatingEntity);
    });
    it("should return null a new rating created when addRatingRepository insert it", async () => {
        addRatingRepository.addRating.mockResolvedValue(null);
        const rating = await testInstance(fakeRatingEntity);
        expect(rating).toBeNull();
    });
    it("should rethrow if addRating of AddRatingRepository throws", async () => {
        addRatingRepository.addRating.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeRatingEntity)).rejects.toThrowError("any_error");
    });
});
