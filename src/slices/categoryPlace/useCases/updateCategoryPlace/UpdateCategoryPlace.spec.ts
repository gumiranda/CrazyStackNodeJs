import { UpdateCategoryPlaceRepository } from "@/slices/categoryPlace/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCategoryPlaceEntity } from "@/slices/categoryPlace/entities/CategoryPlaceEntity.spec";
import { UpdateCategoryPlace, updateCategoryPlace } from "./UpdateCategoryPlace";

describe("UpdateCategoryPlace", () => {
    let fakeQuery: Query;
    let testInstance: UpdateCategoryPlace;
    let updateCategoryPlaceRepository: MockProxy<UpdateCategoryPlaceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateCategoryPlaceRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updateCategoryPlaceRepository.updateCategoryPlace.mockResolvedValue(fakeCategoryPlaceEntity);
    });
    beforeEach(() => {
        testInstance = updateCategoryPlace(updateCategoryPlaceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updateCategoryPlace of UpdateCategoryPlaceRepository with correct values", async () => {
        await testInstance(fakeQuery, fakeCategoryPlaceEntity);
        expect(updateCategoryPlaceRepository.updateCategoryPlace).toHaveBeenCalledWith(
            fakeQuery,
            fakeCategoryPlaceEntity
        );
        expect(updateCategoryPlaceRepository.updateCategoryPlace).toHaveBeenCalledTimes(1);
    });
    it("should return a categoryPlace updateed when updateCategoryPlaceRepository insert it", async () => {
        const categoryPlace = await testInstance(fakeQuery, fakeCategoryPlaceEntity);
        expect(categoryPlace).toEqual(fakeCategoryPlaceEntity);
    });
    it("should return null a new categoryPlace updateed when updateCategoryPlaceRepository return it", async () => {
        updateCategoryPlaceRepository.updateCategoryPlace.mockResolvedValue(null);
        const categoryPlace = await testInstance(fakeQuery, fakeCategoryPlaceEntity);
        expect(categoryPlace).toBeNull();
    });
    it("should rethrow if updateCategoryPlace of UpdateCategoryPlaceRepository throws", async () => {
        updateCategoryPlaceRepository.updateCategoryPlace.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakeCategoryPlaceEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
