import { fakeCategoryPlaceEntity } from "@/slices/categoryPlace/entities/CategoryPlaceEntity.spec";
import { CategoryPlaceEntity } from "@/slices/categoryPlace/entities";
import { AddCategoryPlaceRepository } from "@/slices/categoryPlace/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addCategoryPlace } from "./AddCategoryPlace";

describe("addCategoryPlace", () => {
    let testInstance: any;
    let addCategoryPlaceRepository: MockProxy<AddCategoryPlaceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addCategoryPlaceRepository = mock();
        addCategoryPlaceRepository.addCategoryPlace.mockResolvedValue(fakeCategoryPlaceEntity);
    });
    beforeEach(() => {
        testInstance = addCategoryPlace(addCategoryPlaceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addCategoryPlace of AddCategoryPlaceRepository with correct values", async () => {
        await testInstance(fakeCategoryPlaceEntity);
        expect(addCategoryPlaceRepository.addCategoryPlace).toHaveBeenCalledWith(
            new CategoryPlaceEntity(fakeCategoryPlaceEntity)
        );
        expect(addCategoryPlaceRepository.addCategoryPlace).toHaveBeenCalledTimes(1);
    });
    it("should return a new categoryPlace created when addCategoryPlaceRepository insert it", async () => {
        const categoryPlace = await testInstance(fakeCategoryPlaceEntity);
        expect(categoryPlace).toEqual(fakeCategoryPlaceEntity);
    });
    it("should return null a new categoryPlace created when addCategoryPlaceRepository insert it", async () => {
        addCategoryPlaceRepository.addCategoryPlace.mockResolvedValue(null);
        const categoryPlace = await testInstance(fakeCategoryPlaceEntity);
        expect(categoryPlace).toBeNull();
    });
    it("should rethrow if addCategoryPlace of AddCategoryPlaceRepository throws", async () => {
        addCategoryPlaceRepository.addCategoryPlace.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeCategoryPlaceEntity)).rejects.toThrowError("any_error");
    });
});
