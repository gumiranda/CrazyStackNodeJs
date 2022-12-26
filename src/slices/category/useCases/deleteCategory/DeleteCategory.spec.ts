import { fakeCategoryEntity } from "@/slices/category/entities/CategoryEntity.spec";
import { CategoryEntity } from "@/slices/category/entities";
import { DeleteCategoryRepository } from "@/slices/category/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteCategory } from "./DeleteCategory";
import { Query } from "@/application/types";

describe("deleteCategory", () => {
    let testInstance: any;
    let fakeQuery: Query;
    let deleteCategoryRepository: MockProxy<DeleteCategoryRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        deleteCategoryRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        deleteCategoryRepository.deleteCategory.mockResolvedValue(fakeCategoryEntity);
    });
    beforeEach(() => {
        testInstance = deleteCategory(deleteCategoryRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call deleteCategory of DeleteCategoryRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(deleteCategoryRepository.deleteCategory).toHaveBeenCalledWith(fakeQuery);
        expect(deleteCategoryRepository.deleteCategory).toHaveBeenCalledTimes(1);
    });
    it("should return a new category deleted when deleteCategoryRepository delete it", async () => {
        const category = await testInstance(fakeQuery);
        expect(category).toEqual(fakeCategoryEntity);
    });
    it("should return null a new category deleted when deleteCategoryRepository delete it", async () => {
        deleteCategoryRepository.deleteCategory.mockResolvedValue(null);
        const category = await testInstance(fakeCategoryEntity);
        expect(category).toBeNull();
    });
    it("should rethrow if deleteCategory of DeleteCategoryRepository throws", async () => {
        deleteCategoryRepository.deleteCategory.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
