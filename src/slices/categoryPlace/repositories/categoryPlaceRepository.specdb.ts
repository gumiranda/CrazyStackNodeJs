import {
    fakeCategoryPlaceEntity,
    fakeCategoryPlacePaginated,
} from "@/slices/categoryPlace/entities/CategoryPlaceEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { CategoryPlaceRepository } from "./categoryPlaceRepository";

describe("CategoryPlace Mongo Repository", () => {
    let fakeQuery: Query;
    let testInstance: CategoryPlaceRepository;
    let repository: MockProxy<Repository>;
    beforeAll(async () => {
        fakeQuery = { fields: { name: "123" }, options: {} };
        MockDate.set(new Date());
        repository = mock<Repository>();
        repository.add.mockResolvedValue(fakeCategoryPlaceEntity);
        repository.getOne.mockResolvedValue(fakeCategoryPlaceEntity);
        repository.update.mockResolvedValue(fakeCategoryPlaceEntity);
        repository.getPaginate.mockResolvedValue(fakeCategoryPlacePaginated?.categoryPlaces);
        repository.getCount.mockResolvedValue(fakeCategoryPlacePaginated?.total);
        repository.deleteOne.mockResolvedValue(true);
    });
    beforeEach(async () => {
        testInstance = new CategoryPlaceRepository(repository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    test("should call add of addCategoryPlace with correct values", async () => {
        await testInstance.addCategoryPlace(fakeCategoryPlaceEntity);
        expect(repository.add).toHaveBeenCalledWith(fakeCategoryPlaceEntity);
        expect(repository.add).toHaveBeenCalledTimes(1);
    });
    test("should return a new categoryPlace created when addCategoryPlace insert it", async () => {
        const result = await testInstance.addCategoryPlace(fakeCategoryPlaceEntity);
        expect(result).toEqual(fakeCategoryPlaceEntity);
    });
    test("should return null when addCategoryPlace returns null", async () => {
        repository.add.mockResolvedValueOnce(null);
        const result = await testInstance.addCategoryPlace(fakeCategoryPlaceEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if add of addCategoryPlace throws", async () => {
        repository.add.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.addCategoryPlace(fakeCategoryPlaceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if update of updateCategoryPlace throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateCategoryPlace(fakeQuery, fakeCategoryPlaceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call update of updateCategoryPlace with correct values", async () => {
        await testInstance.updateCategoryPlace(fakeQuery, fakeCategoryPlaceEntity);
        expect(repository.update).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeCategoryPlaceEntity
        );
        expect(repository.update).toHaveBeenCalledTimes(1);
    });
    test("should return a categoryPlace updated when updateCategoryPlace update it", async () => {
        const result = await testInstance.updateCategoryPlace(fakeQuery, fakeCategoryPlaceEntity);
        expect(result).toEqual(fakeCategoryPlaceEntity);
    });
    test("should return a categoryPlace updated when updateCategoryPlace update it when i pass null", async () => {
        const result = await testInstance.updateCategoryPlace(null as any, fakeCategoryPlaceEntity);
        expect(result).toEqual(fakeCategoryPlaceEntity);
    });
    test("should return null when updateCategoryPlace returns null", async () => {
        repository.update.mockResolvedValueOnce(null);
        const result = await testInstance.updateCategoryPlace(fakeQuery, fakeCategoryPlaceEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if update of updateCategoryPlace throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateCategoryPlace(fakeQuery, fakeCategoryPlaceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call delete of deleteCategoryPlace with correct values", async () => {
        await testInstance.deleteCategoryPlace(fakeQuery);
        expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.deleteOne).toHaveBeenCalledTimes(1);
    });
    test("should return a new categoryPlace created when deleteCategoryPlace insert it", async () => {
        const result = await testInstance.deleteCategoryPlace(fakeQuery);
        expect(result).toEqual(true);
    });
    test("should return null when deleteCategoryPlace returns null", async () => {
        repository.deleteOne.mockResolvedValueOnce(null);
        const result = await testInstance.deleteCategoryPlace(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if delete of deleteCategoryPlace throws", async () => {
        repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.deleteCategoryPlace(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call load of loadCategoryPlace with correct values", async () => {
        await testInstance.loadCategoryPlace(fakeQuery);
        expect(repository.getOne).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeQuery?.options
        );
        expect(repository.getOne).toHaveBeenCalledTimes(1);
    });
    test("should return a categoryPlace when loadCategoryPlace loaded it", async () => {
        const result = await testInstance.loadCategoryPlace(fakeQuery);
        expect(result).toEqual(fakeCategoryPlaceEntity);
    });
    test("should return null when loadCategoryPlace returns null", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadCategoryPlace(fakeQuery);
        expect(result).toBeNull();
    });
    test("should return null when loadCategoryPlace returns null passing null as parameter", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadCategoryPlace(null as any);
        expect(result).toBeNull();
    });
    test("should rethrow if load of loadCategoryPlace throws", async () => {
        repository.getOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadCategoryPlace(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call getCount of loadCategoryPlaceByPage with correct values", async () => {
        await testInstance.loadCategoryPlaceByPage(fakeQuery);
        expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.getCount).toHaveBeenCalledTimes(1);
    });
    test("should call getPaginate of loadCategoryPlaceByPage with correct values", async () => {
        await testInstance.loadCategoryPlaceByPage(fakeQuery);
        expect(repository.getPaginate).toHaveBeenCalledWith(
            0,
            fakeQuery?.fields,
            {
                createdAt: -1,
            },
            10,
            {}
        );
        expect(repository.getPaginate).toHaveBeenCalledTimes(1);
    });
    test("should return a categoryPlaceByPage when loadCategoryPlaceByPage loaded it", async () => {
        const result = await testInstance.loadCategoryPlaceByPage(fakeQuery);
        expect(result).toEqual(fakeCategoryPlacePaginated);
    });
    test("should return null when loadCategoryPlaceByPage returns null", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadCategoryPlaceByPage(fakeQuery);
        expect(result).toEqual({ categoryPlaces: null, total: 0 });
    });
    test("should return null when loadCategoryPlaceByPage returns null passing null as parameter", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadCategoryPlaceByPage(null as any);
        expect(result).toEqual({ categoryPlaces: null, total: 0 });
    });
    test("should rethrow if load of loadCategoryPlaceByPage throws", async () => {
        repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadCategoryPlaceByPage(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
});
