import { fakeCategoryEntity } from "@/slices/category/entities/CategoryEntity.spec";
import { CategoryEntity } from "@/slices/category/entities";
import { AddCategoryRepository } from "@/slices/category/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addCategory } from "./AddCategory";

describe("addCategory", () => {
    let testInstance: any;
    let addCategoryRepository: MockProxy<AddCategoryRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addCategoryRepository = mock();
        addCategoryRepository.addCategory.mockResolvedValue(fakeCategoryEntity);
    });
    beforeEach(() => {
        testInstance = addCategory(addCategoryRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addCategory of AddCategoryRepository with correct values", async () => {
        await testInstance(fakeCategoryEntity);
        expect(addCategoryRepository.addCategory).toHaveBeenCalledWith(
            new CategoryEntity(fakeCategoryEntity)
        );
        expect(addCategoryRepository.addCategory).toHaveBeenCalledTimes(1);
    });
    it("should return a new category created when addCategoryRepository insert it", async () => {
        const category = await testInstance(fakeCategoryEntity);
        expect(category).toEqual(fakeCategoryEntity);
    });
    it("should return null a new category created when addCategoryRepository insert it", async () => {
        addCategoryRepository.addCategory.mockResolvedValue(null);
        const category = await testInstance(fakeCategoryEntity);
        expect(category).toBeNull();
    });
    it("should rethrow if addCategory of AddCategoryRepository throws", async () => {
        addCategoryRepository.addCategory.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeCategoryEntity)).rejects.toThrowError("any_error");
    });
});
