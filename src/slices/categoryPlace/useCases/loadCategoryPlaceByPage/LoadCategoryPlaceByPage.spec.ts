import { LoadCategoryPlaceByPageRepository } from "@/slices/categoryPlace/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCategoryPlacePaginated } from "@/slices/categoryPlace/entities/CategoryPlaceEntity.spec";
import { LoadCategoryPlaceByPage, loadCategoryPlaceByPage } from "./LoadCategoryPlaceByPage";

describe("LoadCategoryPlaceByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadCategoryPlaceByPage;
    let loadCategoryPlaceByPageRepository: MockProxy<LoadCategoryPlaceByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadCategoryPlaceByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadCategoryPlaceByPageRepository.loadCategoryPlaceByPage.mockResolvedValue(
            fakeCategoryPlacePaginated
        );
    });
    beforeEach(() => {
        testInstance = loadCategoryPlaceByPage(loadCategoryPlaceByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadCategoryPlaceByPage of LoadCategoryPlaceByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadCategoryPlaceByPageRepository.loadCategoryPlaceByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadCategoryPlaceByPageRepository.loadCategoryPlaceByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a categoryPlace loaded when loadCategoryPlaceByPageRepository insert it", async () => {
        const categoryPlace = await testInstance(fakeQuery);
        expect(categoryPlace).toEqual(fakeCategoryPlacePaginated);
    });
    it("should return null a new categoryPlace loaded when loadCategoryPlaceByPageRepository return it", async () => {
        loadCategoryPlaceByPageRepository.loadCategoryPlaceByPage.mockResolvedValue(null);
        const categoryPlace = await testInstance(fakeQuery);
        expect(categoryPlace).toBeNull();
    });
    it("should rethrow if loadCategoryPlaceByPage of LoadCategoryPlaceByPageRepository throws", async () => {
        loadCategoryPlaceByPageRepository.loadCategoryPlaceByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
