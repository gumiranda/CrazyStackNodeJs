import { LoadRatingRepository } from "@/slices/rating/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRatingEntity } from "@/slices/rating/entities/RatingEntity.spec";
import { LoadRating, loadRating } from "./LoadRating";

describe("LoadRating", () => {
    let fakeQuery: Query;
    let testInstance: LoadRating;
    let loadRatingRepository: MockProxy<LoadRatingRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadRatingRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadRatingRepository.loadRating.mockResolvedValue(fakeRatingEntity);
    });
    beforeEach(() => {
        testInstance = loadRating(loadRatingRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadRating of LoadRatingRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadRatingRepository.loadRating).toHaveBeenCalledWith(fakeQuery);
        expect(loadRatingRepository.loadRating).toHaveBeenCalledTimes(1);
    });
    it("should return a rating loaded when loadRatingRepository insert it", async () => {
        const rating = await testInstance(fakeQuery);
        expect(rating).toEqual(fakeRatingEntity);
    });
    it("should return null a new rating loaded when loadRatingRepository return it", async () => {
        loadRatingRepository.loadRating.mockResolvedValue(null);
        const rating = await testInstance(fakeQuery);
        expect(rating).toBeNull();
    });
    it("should rethrow if loadRating of LoadRatingRepository throws", async () => {
        loadRatingRepository.loadRating.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
