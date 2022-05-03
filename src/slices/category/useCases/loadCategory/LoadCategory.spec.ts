import { LoadCategoryRepository } from "@/slices/category/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCategoryEntity } from "@/slices/category/entities/CategoryEntity.spec";
import { LoadCategory, loadCategory } from "./LoadCategory";

describe("LoadCategory", () => {
    let fakeQuery: Query;
    let testInstance: LoadCategory;
    let loadCategoryRepository: MockProxy<LoadCategoryRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadCategoryRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadCategoryRepository.loadCategory.mockResolvedValue(fakeCategoryEntity);
    });
    beforeEach(() => {
        testInstance = loadCategory(loadCategoryRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadCategory of LoadCategoryRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadCategoryRepository.loadCategory).toHaveBeenCalledWith(fakeQuery);
        expect(loadCategoryRepository.loadCategory).toHaveBeenCalledTimes(1);
    });
});
