import { LoadCategoryPlaceRepository } from "@/slices/categoryPlace/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCategoryPlaceEntity } from "@/slices/categoryPlace/entities/CategoryPlaceEntity.spec";
import { LoadCategoryPlace, loadCategoryPlace } from "./LoadCategoryPlace";

describe("LoadCategoryPlace", () => {
    let fakeQuery: Query;
    let testInstance: LoadCategoryPlace;
    let loadCategoryPlaceRepository: MockProxy<LoadCategoryPlaceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadCategoryPlaceRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadCategoryPlaceRepository.loadCategoryPlace.mockResolvedValue(fakeCategoryPlaceEntity);
    });
    beforeEach(() => {
        testInstance = loadCategoryPlace(loadCategoryPlaceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadCategoryPlace of LoadCategoryPlaceRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadCategoryPlaceRepository.loadCategoryPlace).toHaveBeenCalledWith(fakeQuery);
        expect(loadCategoryPlaceRepository.loadCategoryPlace).toHaveBeenCalledTimes(1);
    });
    it("should return a categoryPlace loaded when loadCategoryPlaceRepository insert it", async () => {
        const categoryPlace = await testInstance(fakeQuery);
        expect(categoryPlace).toEqual(fakeCategoryPlaceEntity);
    });
    it("should return null a new categoryPlace loaded when loadCategoryPlaceRepository return it", async () => {
        loadCategoryPlaceRepository.loadCategoryPlace.mockResolvedValue(null);
        const categoryPlace = await testInstance(fakeQuery);
        expect(categoryPlace).toBeNull();
    });
    it("should rethrow if loadCategoryPlace of LoadCategoryPlaceRepository throws", async () => {
        loadCategoryPlaceRepository.loadCategoryPlace.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
